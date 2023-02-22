import type { NextApiRequest, NextApiResponse } from 'next';
import {
  PrismaClientValidationError,
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
} from '@prisma/client/runtime';
import prismaClient from '../../../prisma/client';
import { decrypt } from '../../../helper-functions/encryption';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await prismaClient.customers
        .findUnique({
          where: {
            email: req.body.email,
          },
        })
        .then((data: any) => {
          res.status(200).json({
            error: false,
            response: {
              name: `${data.firstname} ${data.lastname}`,
              decryptedPassword: decrypt(data.password),
            },
            message: 'Decrypted password returned successfully',
          });
        })
        .catch((error: any) => {
          if (error instanceof PrismaClientValidationError) {
            res.status(404).json({
              error: true,
              errorType: 'PrismaClientValidationError',
              errorName: error.name,
              errorMesaage: error.message,
              errorCause: error.cause,
              errorStack: error.stack,
            });
          } else if (error instanceof PrismaClientInitializationError) {
            res.status(404).json({
              error: true,
              errorType: 'PrismaClientInitializationError',
              errorName: error.name,
              errorMesaage: error.message,
              errorCause: error.cause,
              errorStack: error.stack,
            });
          } else if (error instanceof PrismaClientKnownRequestError) {
            res.status(404).json({
              error: true,
              errorType: 'PrismaClientKnownRequestError',
              errorName: error.name,
              errorMesaage: error.message,
              errorCause: error.cause,
              errorStack: error.stack,
              errorMeta: error.meta,
            });
          } else {
            res.status(404).json({
              error: true,
              errorType: 'PrismaClientUnknownRequestError',
              errorName: error.name,
              errorMesaage: error.message,
              errorCause: error.cause,
              errorStack: error.stack,
            });
          }
        });
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
