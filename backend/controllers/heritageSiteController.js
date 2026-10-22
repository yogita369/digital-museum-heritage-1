const mongoose = require('mongoose');
const HeritageSite = require('../models/HeritageSite');

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;

const sendError = (res, statusCode, message, details = undefined) =>
  res.status(statusCode).json({
    success: false,
    error: {
      message,
      ...(details ? { details } : {}),
    },
  });

const parsePagination = (query) => {
  const page = Math.max(parseInt(query.page, 10) || DEFAULT_PAGE, 1);
  const requestedLimit = Math.max(parseInt(query.limit, 10) || DEFAULT_LIMIT, 1);
  const limit = Math.min(requestedLimit, MAX_LIMIT);

  return {
    page,
    limit,
    skip: (page - 1) * limit,
  };
};

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const handleControllerError = (res, error) => {
  if (error.name === 'ValidationError') {
    return sendError(res, 400, 'Validation failed', error.errors);
  }

  if (error.code === 11000) {
    return sendError(res, 409, 'Duplicate heritage site value', error.keyValue);
  }

  return sendError(res, 500, 'Server error');
};

const buildHeritageSiteQuery = ({ search, siteType }) => {
  const query = {};

  if (search) {
    const searchRegex = new RegExp(escapeRegex(search.trim()), 'i');

    query.$or = [
      { name: searchRegex },
      { description: searchRegex },
      { location: searchRegex },
      { state: searchRegex },
      { historicalPeriod: searchRegex },
      { significance: searchRegex },
      { siteType: searchRegex },
      { preservationStatus: searchRegex },
      { tags: searchRegex },
    ];
  }

  if (siteType) {
    query.siteType = new RegExp(`^${escapeRegex(siteType.trim())}$`, 'i');
  }

  return query;
};

const listHeritageSites = async (req, res) => {
  try {
    const { page, limit, skip } = parsePagination(req.query);
    const query = buildHeritageSiteQuery(req.query);

    const [heritageSites, total] = await Promise.all([
      HeritageSite.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      HeritageSite.countDocuments(query),
    ]);

    return res.status(200).json({
      success: true,
      data: heritageSites,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
};

const getHeritageSiteById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return sendError(res, 400, 'Invalid heritage site ID');
    }

    const heritageSite = await HeritageSite.findById(req.params.id);

    if (!heritageSite) {
      return sendError(res, 404, 'Heritage site not found');
    }

    return res.status(200).json({
      success: true,
      data: heritageSite,
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
};

const createHeritageSite = async (req, res) => {
  try {
    const heritageSite = await HeritageSite.create(req.body);

    return res.status(201).json({
      success: true,
      data: heritageSite,
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
};

const updateHeritageSite = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return sendError(res, 400, 'Invalid heritage site ID');
    }

    const heritageSite = await HeritageSite.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!heritageSite) {
      return sendError(res, 404, 'Heritage site not found');
    }

    return res.status(200).json({
      success: true,
      data: heritageSite,
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
};

const deleteHeritageSite = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return sendError(res, 400, 'Invalid heritage site ID');
    }

    const heritageSite = await HeritageSite.findByIdAndDelete(req.params.id);

    if (!heritageSite) {
      return sendError(res, 404, 'Heritage site not found');
    }

    return res.status(200).json({
      success: true,
      data: heritageSite,
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
};

module.exports = {
  listHeritageSites,
  getHeritageSiteById,
  createHeritageSite,
  updateHeritageSite,
  deleteHeritageSite,
};
