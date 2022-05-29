// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../app/datasources'
import { Entry, IEntry } from '../../../../app/models'

type Data = 
  | {message: string}
  | IEntry

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET': 
      return getEntry(req, res)
    case 'PUT':
      return updateEntries(req, res)
    case 'DELETE':
      return deleteEntries(req, res)
    default:
      res.status(400).json({ message: 'Método no existe' })
  }
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {id} = req.query;
  let entry;

  try {
    await db.connect();
    entry = await Entry.findById(id);
    await db.disconnect();
  } catch (error) {
    await db.disconnect();
    console.error(error)

    res.status(500).json({
      message: 'Algo salio mal, revisar consola del servidor'
    })
  }

  if (!entry) {
    return res.status(400).json({message: 'No existe entrada con ese id'})
  }

  return res.status(200).json(entry)
}

const updateEntries = async (req: NextApiRequest,res: NextApiResponse<Data>) => {
  const {id} = req.query;

    
  await db.connect();
  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(400).json({message: 'No existe entrada con ese id'})
  }
  const  {description = entryToUpdate.description, status = entryToUpdate.status} = req.body;

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(id, {description, status}, {runValidators: true, new: true})

    await db.disconnect();
    res.status(200).json(updatedEntry!)
  } catch (error: any) {
    await db.disconnect();
    console.error(error)

    res.status(400).json({
      message: error.errors.status.message
    })
  }
}

const deleteEntries = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {id} = req.query;
  let entry;

  try {
    await db.connect();
    entry = await Entry.findByIdAndDelete(id)
    console.log(`Entrada eliminada ${id}`)
    await db.disconnect();
  } catch (error) {
    await db.disconnect();
    console.error(error)

    res.status(500).json({
      message: 'Algo salio mal, revisar consola del servidor'
    })
  }

  return res.status(200).json({message: `Entrada eliminada ${id}`})
}