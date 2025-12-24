package com.backend;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.concurrent.CopyOnWriteArrayList;
import org.springframework.stereotype.Component;

@Component
public class OrderWebSocketHandler extends TextWebSocketHandler {
    private static final Logger logger = LoggerFactory.getLogger(OrderWebSocketHandler.class);
    private static final CopyOnWriteArrayList<WebSocketSession> sessions = new CopyOnWriteArrayList<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        sessions.add(session);
        logger.info("Neue Verbindung: {}", session.getId());
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) {
        logger.info("Nachricht empfangen: {}", message.getPayload());
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, org.springframework.web.socket.CloseStatus status) {
        sessions.remove(session);
        logger.info("Verbindung geschlossen: {}", session.getId());
    }

    public boolean hasActiveConnections() {
        return sessions.stream().anyMatch(WebSocketSession::isOpen);
    }

    public void sendOrderUpdate(String orderJson) {
        for (WebSocketSession session : sessions) {
            try {
                session.sendMessage(new TextMessage(orderJson));
            } catch (IOException e) {
                logger.error("Fehler beim Senden der Bestellung: {}", e.getMessage());
            }
        }
    }
}

