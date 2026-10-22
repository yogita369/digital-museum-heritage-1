const mongoose = require('mongoose');

const heritageSiteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Heritage site name is required'],
      trim: true,
      minlength: [2, 'Heritage site name must be at least 2 characters long'],
      maxlength: [150, 'Heritage site name cannot exceed 150 characters'],
    },
    description: {
      type: String,
      required: [true, 'Heritage site description is required'],
      trim: true,
      minlength: [10, 'Heritage site description must be at least 10 characters long'],
      maxlength: [5000, 'Heritage site description cannot exceed 5000 characters'],
    },
    location: {
      type: String,
      required: [true, 'Heritage site location is required'],
      trim: true,
      maxlength: [200, 'Heritage site location cannot exceed 200 characters'],
    },
    state: {
      type: String,
      trim: true,
      default: '',
      maxlength: [100, 'Heritage site state cannot exceed 100 characters'],
    },
    historicalPeriod: {
      type: String,
      trim: true,
      default: '',
      maxlength: [150, 'Historical period cannot exceed 150 characters'],
    },
    significance: {
      type: String,
      trim: true,
      default: '',
      maxlength: [3000, 'Heritage site significance cannot exceed 3000 characters'],
    },
    imageUrl: {
      type: String,
      trim: true,
      default: '',
      maxlength: [2048, 'Heritage site image URL cannot exceed 2048 characters'],
    },
    establishedYear: {
      type: Number,
      default: null,
      min: [-10000, 'Established year is too far in the past'],
      max: [new Date().getFullYear(), 'Established year cannot be in the future'],
    },
    siteType: {
      type: String,
      trim: true,
      default: '',
      maxlength: [100, 'Heritage site type cannot exceed 100 characters'],
    },
    coordinates: {
      latitude: {
        type: Number,
        default: null,
        min: [-90, 'Latitude cannot be less than -90'],
        max: [90, 'Latitude cannot be greater than 90'],
      },
      longitude: {
        type: Number,
        default: null,
        min: [-180, 'Longitude cannot be less than -180'],
        max: [180, 'Longitude cannot be greater than 180'],
      },
    },
    visitorInfo: {
      openingHours: {
        type: String,
        trim: true,
        default: '',
        maxlength: [500, 'Opening hours cannot exceed 500 characters'],
      },
      entryFee: {
        type: String,
        trim: true,
        default: '',
        maxlength: [200, 'Entry fee cannot exceed 200 characters'],
      },
      accessibility: {
        type: String,
        trim: true,
        default: '',
        maxlength: [1000, 'Accessibility information cannot exceed 1000 characters'],
      },
      contactInfo: {
        type: String,
        trim: true,
        default: '',
        maxlength: [500, 'Contact information cannot exceed 500 characters'],
      },
    },
    preservationStatus: {
      type: String,
      trim: true,
      default: '',
      maxlength: [100, 'Heritage site preservation status cannot exceed 100 characters'],
    },
    tags: {
      type: [
        {
          type: String,
          trim: true,
          maxlength: [50, 'Heritage site tag cannot exceed 50 characters'],
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('HeritageSite', heritageSiteSchema);
