import React, { useState, useEffect } from 'react';
import { Download, FileText, Video, Users, Calendar } from 'lucide-react';
import { getScoutingReports } from '../services/scoutingService.js';
import { getEvents } from '../services/calendarService.js';
import '../styles/Scouting.css';

export default function ScoutingPlayersPage() {
  const [reports, setReports] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [reportsRes, eventsRes] = await Promise.all([
        getScoutingReports({}),
        getEvents(),
      ]);
      setReports(reportsRes.data || []);
      const sortedEvents = (eventsRes.data || []).sort((a, b) =>
        new Date(a.startTime) - new Date(b.startTime)
      );
      setEvents(sortedEvents);
      if (sortedEvents.length > 0) {
        setSelectedEvent(sortedEvents[0].id);
      }
    } catch (error) {
      console.error('Error loading:', error);
    } finally {
      setLoading(false);
    }
  };

  const getReportsForEvent = (eventId) => {
    return reports.filter(r => r.eventId === eventId);
  };

  const getEventDetails = (eventId) => {
    return events.find(e => e.id === eventId);
  };

  const getFileIcon = (fileType) => {
    if (!fileType) return <FileText size={20} />;
    if (fileType === 'xlsx' || fileType === 'xls') return <FileText size={20} />;
    if (fileType === 'key') return <FileText size={20} />;
    if (['mp4', 'mpeg', 'mov', 'avi', 'webm'].includes(fileType)) {
      return <Video size={20} />;
    }
    return <FileText size={20} />;
  };

  if (loading) return <div className="page-container">Loading...</div>;

  const upcomingEvents = events.filter(e => new Date(e.startTime) >= new Date());
  const eventReports = selectedEvent ? getReportsForEvent(selectedEvent) : [];
  const currentEvent = getEventDetails(selectedEvent);

  return (
    <div className="page-container">
      <div className="scouting-players-header">
        <h1>Game Day Scouting</h1>
      </div>

      {upcomingEvents.length === 0 ? (
        <div className="no-matches-alert">
          <Calendar size={24} />
          <p>No upcoming matches</p>
        </div>
      ) : (
        <>
          <div className="matches-timeline">
            <h3>Upcoming Matches</h3>
            <div className="matches-list">
              {upcomingEvents.map(event => {
                const matchReports = getReportsForEvent(event.id);
                const hasReports = matchReports.length > 0;
                return (
                  <button
                    key={event.id}
                    className={`match-item ${selectedEvent === event.id ? 'active' : ''} ${hasReports ? 'has-reports' : ''}`}
                    onClick={() => setSelectedEvent(event.id)}
                  >
                    <div className="match-date">
                      {new Date(event.startTime).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="match-info">
                      <div className="match-title">{event.title}</div>
                      {event.opponent && <div className="match-opponent">{event.opponent}</div>}
                      {hasReports && <span className="report-badge">{matchReports.length}</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {currentEvent && (
            <div className="scouting-detail-section">
              <div className="event-header-detail">
                <h2>{currentEvent.title}</h2>
                {currentEvent.opponent && <span className="opponent-tag">{currentEvent.opponent}</span>}
                <span className="date-detail">
                  {new Date(currentEvent.startTime).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>

              {currentEvent.description && (
                <div className="event-description">
                  {currentEvent.description}
                </div>
              )}

              {currentEvent.location && (
                <div className="event-location">
                  📍 {currentEvent.location}
                </div>
              )}

              {eventReports.length === 0 ? (
                <div className="no-reports-alert">
                  <FileText size={24} />
                  <p>No scouting reports available for this match yet</p>
                </div>
              ) : (
                <div className="scouting-reports-grid">
                  {eventReports.map(report => (
                    <div key={report.id} className="player-scouting-card">
                      <div className="card-opponent-header">
                        <h3>{report.opponent}</h3>
                      </div>

                      {report.keyPlayers && JSON.parse(report.keyPlayers).length > 0 && (
                        <div className="key-players-section">
                          <div className="section-title">
                            <Users size={16} /> Key Players
                          </div>
                          <div className="players-grid">
                            {JSON.parse(report.keyPlayers).map((player, idx) => (
                              <div key={idx} className="player-card">
                                {player}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {report.strategy && (
                        <div className="strategy-section">
                          <div className="section-title">Strategy</div>
                          <p>{report.strategy}</p>
                        </div>
                      )}

                      {report.content && (
                        <div className="content-section">
                          <div className="section-title">Analysis</div>
                          <p>{report.content}</p>
                        </div>
                      )}

                      {report.fileUrl && (
                        <div className="file-download-section">
                          <a
                            href={report.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="file-download-btn"
                          >
                            {getFileIcon(report.fileType)}
                            <span>Download {report.fileType?.toUpperCase() || 'File'}</span>
                            <Download size={16} />
                          </a>
                        </div>
                      )}

                      {report.notes && (
                        <div className="notes-section-players">
                          <div className="section-title">Notes</div>
                          <p>{report.notes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
