const mongoose = require('mongoose');

const artifactSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Artifact title is required'],
      trim: true,
      minlength: [2, 'Artifact title must be at least 2 characters long'],
      maxlength: [150, 'Artifact title cannot exceed 150 characters'],
    },
    description: {
      type: String,
      required: [true, 'Artifact description is required'],
      trim: true,
      minlength: [10, 'Artifact description must be at least 10 characters long'],
      maxlength: [5000, 'Artifact description cannot exceed 5000 characters'],
    },
    category: {
      type: String,
      required: [true, 'Artifact category is required'],
      trim: true,
      maxlength: [100, 'Artifact category cannot exceed 100 characters'],
    },
    period: {
      type: String,
      trim: true,
      default: '',
      maxlength: [100, 'Artifact period cannot exceed 100 characters'],
    },
    origin: {
      type: String,
      trim: true,
      default: '',
      maxlength: [150, 'Artifact origin cannot exceed 150 characters'],
    },
    material: {
      type: String,
      trim: true,
      default: '',
      maxlength: [150, 'Artifact material cannot exceed 150 characters'],
    },
    dimensions: {
      type: String,
      trim: true,
      default: '',
      maxlength: [150, 'Artifact dimensions cannot exceed 150 characters'],
    },
    imageUrl: {
      type: String,
      trim: true,
      default: '',
      maxlength: [2048, 'Artifact image URL cannot exceed 2048 characters'],
    },
    acquisitionDate: {
      type: Date,
      default: null,
    },
    provenance: {
      type: String,
      trim: true,
      default: '',
      maxlength: [3000, 'Artifact provenance cannot exceed 3000 characters'],
    },
    preservationStatus: {
      type: String,
      trim: true,
      default: '',
      maxlength: [100, 'Artifact preservation status cannot exceed 100 characters'],
    },
    museumLocation: {
      type: String,
      trim: true,
      default: '',
      maxlength: [150, 'Artifact museum location cannot exceed 150 characters'],
    },
    tags: {
      type: [
        {
          type: String,
          trim: true,
          maxlength: [50, 'Artifact tag cannot exceed 50 characters'],
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Artifact', artifactSchema);
