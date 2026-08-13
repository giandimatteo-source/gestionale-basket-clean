import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';

const prisma = new PrismaClient();

export async function getTrainingSessions(req, res) {
  try {
    const { page = 1, limit = 20, search, type } = req.query;
    const skip = (page - 1) * limit;

    const where = {
      ...(search && { title: { contains: search, mode: 'insensitive' } }),
      ...(type && { type }),
    };

    const sessions = await prisma.trainingSession.findMany({
      where,
      include: {
        creator: { select: { name: true } },
        participants: true,
      },
      orderBy: { date: 'desc' },
      skip: parseInt(skip),
      take: parseInt(limit),
    });

    const total = await prisma.trainingSession.count({ where });

    res.json({
      success: true,
      data: sessions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching training sessions:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function getTrainingSessionById(req, res) {
  try {
    const { id } = req.params;

    const session = await prisma.trainingSession.findUnique({
      where: { id },
      include: {
        creator: true,
        participants: {
          include: { roster: true },
        },
      },
    });

    if (!session) {
      return res.status(404).json({ success: false, error: 'Training session not found' });
    }

    res.json({ success: true, data: session });
  } catch (error) {
    console.error('Error fetching training session:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function createTrainingSession(req, res) {
  try {
    const { title, date, duration, type, description, notes, participants, calendarEventId } = req.body;
    const creatorId = req.user?.id;

    if (!title || !date || !creatorId) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    let fileUrl = null;
    if (req.file) {
      fileUrl = `/uploads/trainings/${req.file.filename}`;
    }

    const session = await prisma.trainingSession.create({
      data: {
        title,
        date: new Date(date),
        duration: parseInt(duration) || 60,
        type: type || 'General',
        description,
        notes,
        fileUrl,
        creatorId,
        calendarEventId: calendarEventId || undefined,
        participants: participants
          ? {
              createMany: {
                data: participants.map(p => ({
                  rosterId: p.rosterId,
                  present: p.present !== false,
                  notes: p.notes,
                })),
              },
            }
          : undefined,
      },
      include: {
        creator: true,
        participants: true,
      },
    });

    res.status(201).json({ success: true, data: session });
  } catch (error) {
    console.error('Error creating training session:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function updateTrainingSession(req, res) {
  try {
    const { id } = req.params;
    const { title, date, duration, type, description, notes, participants } = req.body;

    let updateData = {
      title,
      date: date ? new Date(date) : undefined,
      duration: duration ? parseInt(duration) : undefined,
      type,
      description,
      notes,
    };

    if (req.file) {
      const oldSession = await prisma.trainingSession.findUnique({ where: { id } });
      if (oldSession?.fileUrl) {
        const oldPath = path.join(process.cwd(), 'uploads', oldSession.fileUrl.replace('/uploads/', ''));
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      updateData.fileUrl = `/uploads/trainings/${req.file.filename}`;
    }

    const session = await prisma.trainingSession.update({
      where: { id },
      data: updateData,
      include: {
        creator: true,
        participants: true,
      },
    });

    if (participants) {
      await prisma.trainingSessionPlayer.deleteMany({ where: { trainingId: id } });
      if (participants.length > 0) {
        await prisma.trainingSessionPlayer.createMany({
          data: participants.map(p => ({
            trainingId: id,
            rosterId: p.rosterId,
            present: p.present !== false,
            notes: p.notes,
          })),
        });
      }
    }

    res.json({ success: true, data: session });
  } catch (error) {
    console.error('Error updating training session:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function deleteTrainingSession(req, res) {
  try {
    const { id } = req.params;

    const session = await prisma.trainingSession.findUnique({ where: { id } });
    if (!session) {
      return res.status(404).json({ success: false, error: 'Training session not found' });
    }

    if (session.fileUrl) {
      const filePath = path.join(process.cwd(), 'uploads', session.fileUrl.replace('/uploads/', ''));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await prisma.trainingSession.delete({ where: { id } });

    res.json({ success: true, message: 'Training session deleted' });
  } catch (error) {
    console.error('Error deleting training session:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function uploadTrainingVideo(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No video file provided' });
    }

    const fileUrl = `/uploads/trainings/${req.file.filename}`;
    res.json({ success: true, fileUrl });
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
