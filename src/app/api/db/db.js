import mongoose from 'mongoose';

const { Schema } = mongoose;
mongoose.connect(process.env.MONGODB_URI);

const houseSchema = new Schema({
  address: { type: String },
  data: { type: Object },
});

const sessionSchema = new Schema(
  {
    session: { type: String, unique: true, required: true },
    houses: [houseSchema],
  },
  {
    // add createdAt and updatedAt timestamps
    timestamps: true,
  }
);

sessionSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.hash;
  },
});

const Session =
  mongoose.models.Session || mongoose.model('Session', sessionSchema);

export const db = {
  Session,
};
