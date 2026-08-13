import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ============= PLAYER STATS =============

export async function getPlayerStats(req, res) {
  try {
    const { reportId, sheetType } = req.query;

    const where = { reportId };
    if (sheetType) where.sheetType = sheetType;

    const stats = await prisma.scoutingPlayerStats.findMany({
      where,
      orderBy: { playerNumber: 'asc' },
    });

    res.json({ success: true, data: stats });
  } catch (error) {
    console.error('Error fetching player stats:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function createPlayerStat(req, res) {
  try {
    const { reportId, sheetType, playerNumber, playerName, data } = req.body;

    if (!reportId || !sheetType) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const stat = await prisma.scoutingPlayerStats.create({
      data: {
        reportId,
        sheetType,
        playerNumber,
        playerName,
        data: typeof data === 'string' ? data : JSON.stringify(data),
      },
    });

    res.status(201).json({ success: true, data: stat });
  } catch (error) {
    console.error('Error creating player stat:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function updatePlayerStat(req, res) {
  try {
    const { id } = req.params;
    const { playerNumber, playerName, data } = req.body;

    const stat = await prisma.scoutingPlayerStats.update({
      where: { id },
      data: {
        playerNumber,
        playerName,
        data: typeof data === 'string' ? data : JSON.stringify(data),
      },
    });

    res.json({ success: true, data: stat });
  } catch (error) {
    console.error('Error updating player stat:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function deletePlayerStat(req, res) {
  try {
    const { id } = req.params;

    await prisma.scoutingPlayerStats.delete({ where: { id } });

    res.json({ success: true, message: 'Player stat deleted' });
  } catch (error) {
    console.error('Error deleting player stat:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}

// ============= OFFENSIVE BREAKDOWN =============

export async function getOffensiveBreakdown(req, res) {
  try {
    const { reportId } = req.query;

    const data = await prisma.scoutingOffensiveBreakdown.findMany({
      where: { reportId },
      orderBy: { rank: 'asc' },
    });

    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching offensive breakdown:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function createOffensiveBreakdown(req, res) {
  try {
    const { reportId, ...data } = req.body;

    if (!reportId) {
      return res.status(400).json({ success: false, error: 'Missing reportId' });
    }

    const breakdown = await prisma.scoutingOffensiveBreakdown.create({
      data: {
        reportId,
        ...data,
        data: data.data ? JSON.stringify(data.data) : null,
      },
    });

    res.status(201).json({ success: true, data: breakdown });
  } catch (error) {
    console.error('Error creating offensive breakdown:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function updateOffensiveBreakdown(req, res) {
  try {
    const { id } = req.params;
    const { ...data } = req.body;

    const breakdown = await prisma.scoutingOffensiveBreakdown.update({
      where: { id },
      data: {
        ...data,
        data: data.data ? JSON.stringify(data.data) : null,
      },
    });

    res.json({ success: true, data: breakdown });
  } catch (error) {
    console.error('Error updating offensive breakdown:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function deleteOffensiveBreakdown(req, res) {
  try {
    const { id } = req.params;

    await prisma.scoutingOffensiveBreakdown.delete({ where: { id } });

    res.json({ success: true, message: 'Offensive breakdown deleted' });
  } catch (error) {
    console.error('Error deleting offensive breakdown:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}

// ============= COMPARING STATS =============

export async function getComparingStats(req, res) {
  try {
    const { reportId } = req.query;

    const data = await prisma.scoutingComparingStats.findMany({
      where: { reportId },
    });

    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching comparing stats:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function createComparingStat(req, res) {
  try {
    const { reportId, ...data } = req.body;

    if (!reportId) {
      return res.status(400).json({ success: false, error: 'Missing reportId' });
    }

    const stat = await prisma.scoutingComparingStats.create({
      data: {
        reportId,
        ...data,
        data: data.data ? JSON.stringify(data.data) : null,
      },
    });

    res.status(201).json({ success: true, data: stat });
  } catch (error) {
    console.error('Error creating comparing stat:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function updateComparingStat(req, res) {
  try {
    const { id } = req.params;
    const { ...data } = req.body;

    const stat = await prisma.scoutingComparingStats.update({
      where: { id },
      data: {
        ...data,
        data: data.data ? JSON.stringify(data.data) : null,
      },
    });

    res.json({ success: true, data: stat });
  } catch (error) {
    console.error('Error updating comparing stat:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function deleteComparingStat(req, res) {
  try {
    const { id } = req.params;

    await prisma.scoutingComparingStats.delete({ where: { id } });

    res.json({ success: true, message: 'Comparing stat deleted' });
  } catch (error) {
    console.error('Error deleting comparing stat:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}

// ============= KEY POINTS =============

export async function getKeyPoints(req, res) {
  try {
    const { reportId } = req.query;

    const data = await prisma.scoutingKeyPoint.findMany({
      where: { reportId },
      orderBy: { priority: 'asc' },
    });

    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching key points:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function createKeyPoint(req, res) {
  try {
    const { reportId, ...data } = req.body;

    if (!reportId || !data.description) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const point = await prisma.scoutingKeyPoint.create({
      data: {
        reportId,
        ...data,
      },
    });

    res.status(201).json({ success: true, data: point });
  } catch (error) {
    console.error('Error creating key point:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function updateKeyPoint(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;

    const point = await prisma.scoutingKeyPoint.update({
      where: { id },
      data,
    });

    res.json({ success: true, data: point });
  } catch (error) {
    console.error('Error updating key point:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function deleteKeyPoint(req, res) {
  try {
    const { id } = req.params;

    await prisma.scoutingKeyPoint.delete({ where: { id } });

    res.json({ success: true, message: 'Key point deleted' });
  } catch (error) {
    console.error('Error deleting key point:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
