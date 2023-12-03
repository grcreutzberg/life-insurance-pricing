import { Request, Response } from 'express';
import Coverage from '../models/coverage';

export default {
    create: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = await Coverage.create(req.body)

            return res.status(201).json({
                data: {
                    coverageId: id,
                    name: req.body.name,
                    description: req.body.description,
                    capital: req.body.capital,
                    premium: req.body.premium
                }
            });
        } catch (err) {
            return res.status(500).json({
                error: {
                    code: '500',
                    message: err.message
                }
            });
        }
    },
    getOne: async (req: Request, res: Response): Promise<Response> => {
        try {
            const coverage = await Coverage.findOne({ _id: req.params.coverageId })

            if (!coverage || !coverage?.id) {
                return res.status(404).json({
                    error: {
                        code: '404',
                        message: 'Coverage not found'
                    }
                });
            }

            return res.status(200).json({
                data: {
                    coverageId: coverage.id,
                    name: coverage.name,
                    description: coverage.description,
                    capital: coverage.capital,
                    premium: coverage.premium,
                    active: coverage.active
                }
            });
        } catch (err) {
            return res.status(500).json({
                error: {
                    code: '500',
                    message: err.message
                }
            });
        }
    },
    getAll: async (req: Request, res: Response): Promise<Response> => {
        try {
            const coverages = await Coverage.find()

            if (coverages.length === 0) {
                return res.status(404).json({
                    error: {
                        code: '404',
                        message: 'No coverage to return'
                    }
                });
            }

            return res.status(200).json({
                data: {
                    coverages: coverages.map((coverage) => ({
                        coverageId: coverage.id,
                        name: coverage.name,
                        description: coverage.description,
                        capital: coverage.capital,
                        premium: coverage.premium,
                        active: coverage.active
                    }))
                }
            });
        } catch (err) {
            return res.status(500).json({
                error: {
                    code: '500',
                    message: err.message
                }
            });
        }
    },
    getOneByName: async (name: string) => {
        return (await Coverage.findOne({ name: name }));
    },
    update: async (req: Request, res: Response): Promise<Response> => {
        try {
            const coverage = await Coverage.findOneAndUpdate(
                { _id: req.params.coverageId },
                { ...req.body, active: req.body.active || true },
                { new: true }
            );

            if (!coverage || !coverage?.id) {
                return res.status(404).json({
                    error: {
                        code: '404',
                        message: 'Coverage not found'
                    }
                });
            }

            return res.status(200).json({
                data: {
                    coverageId: coverage.id,
                    name: req.body.name,
                    description: req.body.description,
                    capital: req.body.capital,
                    premium: req.body.premium
                }
            });
        } catch (err) {
            return res.status(500).json({
                error: {
                    code: '500',
                    message: err.message
                }
            });
        }
    },
    delete: async (req: Request, res: Response): Promise<Response> => {
        try {
            const coverage = await Coverage.findOne({ _id: req.params.coverageId });
            if (!coverage || !coverage?.id) {
                return res.status(404).json({
                    error: {
                        code: '404',
                        message: 'Coverage not found'
                    }
                });
            }

            if (req.query.hard) {
                await Coverage.deleteOne({ _id: req.params.coverageId });
            } else {
                await Coverage.updateOne({ _id: req.params.coverageId }, { active: false });
            }

            return res.status(200).json({
                data: {
                    coverageId: coverage.id,
                    name: coverage.name,
                    description: coverage.description,
                    capital: coverage.capital,
                    premium: coverage.premium
                }
            });
        } catch (err) {
            return res.status(500).json({
                error: {
                    code: '500',
                    message: err.message
                }
            });
        }
    },
}
