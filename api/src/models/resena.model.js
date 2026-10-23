import mongoose from 'mongoose';

const resenaSchema = new mongoose.Schema(
  {
    productoId: { type: Number, required: true },
    nombre: { type: String, required: true },
    estrellas: { type: Number, required: true, min: 1, max: 5 },
    comentario: { type: String, required: true },
  },
  { timestamps: true }
);

export const Resena = mongoose.model('Resena', resenaSchema);