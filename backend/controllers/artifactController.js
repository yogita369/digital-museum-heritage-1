const mongoose = require('mongoose');
const Artifact = require('../models/Artifact');

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
    return sendError(res, 409, 'Duplicate artifact value', error.keyValue);
  }

  return sendError(res, 500, 'Server error');
};

const buildArtifactQuery = ({ search, category }) => {
  const query = {};

  if (search) {
    const searchRegex = new RegExp(escapeRegex(search.trim()), 'i');

    query.$or = [
      { title: searchRegex },
      { description: searchRegex },
      { category: searchRegex },
      { period: searchRegex },
      { origin: searchRegex },
      { material: searchRegex },
      { provenance: searchRegex },
      { preservationStatus: searchRegex },
      { museumLocation: searchRegex },
      { tags: searchRegex },
    ];
  }

  if (category) {
    query.category = new RegExp(`^${escapeRegex(category.trim())}$`, 'i');
  }

  return query;
};

const listArtifacts = async (req, res) => {
  try {
    const { page, limit, skip } = parsePagination(req.query);
    const query = buildArtifactQuery(req.query);

    const [artifacts, total] = await Promise.all([
      Artifact.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Artifact.countDocuments(query),
    ]);

    return res.status(200).json({
      success: true,
      data: artifacts,
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

const getArtifactById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return sendError(res, 400, 'Invalid artifact ID');
    }

    const artifact = await Artifact.findById(req.params.id);

    if (!artifact) {
      return sendError(res, 404, 'Artifact not found');
    }

    return res.status(200).json({
      success: true,
      data: artifact,
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
};

const createArtifact = async (req, res) => {
  try {
    const artifact = await Artifact.create(req.body);

    return res.status(201).json({
      success: true,
      data: artifact,
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
};

const updateArtifact = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return sendError(res, 400, 'Invalid artifact ID');
    }

    const artifact = await Artifact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!artifact) {
      return sendError(res, 404, 'Artifact not found');
    }

    return res.status(200).json({
      success: true,
      data: artifact,
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
};

const deleteArtifact = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return sendError(res, 400, 'Invalid artifact ID');
    }

    const artifact = await Artifact.findByIdAndDelete(req.params.id);

    if (!artifact) {
      return sendError(res, 404, 'Artifact not found');
    }

    return res.status(200).json({
      success: true,
      data: artifact,
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
};

module.exports = {
  listArtifacts,
  getArtifactById,
  createArtifact,
  updateArtifact,
  deleteArtifact,
};
