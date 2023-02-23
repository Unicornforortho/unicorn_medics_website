import type { NextApiRequest, NextApiResponse } from 'next';
import {
  PrismaClientValidationError,
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
} from '@prisma/client/runtime';
import customer from '../../../zod-schemas/customer';
import prismaClient from '../../../prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const validatedData = customer.parse(req.body);
      if (validatedData) {
        await prismaClient.customers
          .create({
            data: {
              firstname: validatedData.firstname,
              lastname: validatedData.lastname,
              email: validatedData.email,
              password: validatedData.password,
              country: validatedData.country,
              speciality: validatedData.speciality,
              phone: validatedData.phone,
              institution: validatedData.institution,
            },
          })
          .then((data: any) => {
            res.status(201).json({
              error: false,
              response: data,
              message: 'Customer registered successfully',
            });
          })
          .catch((error: any) => {
            if (error instanceof PrismaClientValidationError) {
              res.status(404).json({
                error: true,
                errorType: 'PrismaClientValidationError',
                errorName: error.name,
                errorMesaage: error.message,
              });
            } else if (error instanceof PrismaClientInitializationError) {
              res.status(404).json({
                error: true,
                errorType: 'PrismaClientInitializationError',
                errorName: error.name,
                errorMesaage: error.message,
              });
            } else if (error instanceof PrismaClientKnownRequestError) {
              res.status(404).json({
                error: true,
                errorType: 'PrismaClientKnownRequestError',
                errorName: error.name,
                errorMesaage: error.message,
              });
            } else {
              res.status(404).json({
                error: true,
                errorMesaage: error.message,
              });
            }
          });
      }
    } catch (err) {
      res.status(400).json({
        error: true,
        errorMessage: err,
        message: 'Bad request',
      });
    }
  } else {
    res.status(405).json({
      error: true,
      message: 'Method not allowed',
    });
  }
}
