// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../app/datasources'
import { Entry, IEntry } from '../../../app/models'

type Data = 
  | {message: string}
  | IEntry[]
  | IEntry


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  switch (req.method) {
    case 'GET':
      return getEntries(res)
      case 'POST':
        return createEntries(req, res)
    default:
      res.status(400).json({ message: 'Endpoint not Exist' })
  }  
}

const getEntries = async (res: NextApiResponse<Data>) =>{
  await db.connect();
  const entries = await Entry.find().sort({createdAt: 'ascending'})
  await db.disconnect();
  res.status(200).json(entries)
}

const createEntries = async (req: NextApiRequest,res: NextApiResponse<Data>) =>{
  
  const {description = ''} = req.body
  const newEntry = new Entry(
    {
      description,
      createdAt: new Date()
    }
  )
  try {
    
    await db.connect();
    await newEntry.save()
    await db.disconnect();
    res.status(201).json(newEntry)
  } catch (error) {
    res.status(400).json({
      message: 'error'
    })
  }
}