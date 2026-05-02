const axios = require("axios");
const MinHeap = require("../logic/minHeap");

const API_URL = "http://20.207.122.201/evaluation-service/notifications";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJnZzM4NzZAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwNDQwNCwiaWF0IjoxNzc3NzAzNTA0LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiMDcyODQ4ZTUtY2MwNS00ZGZhLThlN2QtNmFmYzNlNTkyZmNhIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiZ3VydSBwcml5YSBnIiwic3ViIjoiZjkwYmUyMTQtZmYxMi00ZWI3LWE2NTMtNjFmYWRhMzlmYjZhIn0sImVtYWlsIjoiZ2czODc2QHNybWlzdC5lZHUuaW4iLCJuYW1lIjoiZ3VydSBwcml5YSBnIiwicm9sbE5vIjoicmEyMzExMDMyMDIwMDE2IiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiZjkwYmUyMTQtZmYxMi00ZWI3LWE2NTMtNjFmYWRhMzlmYjZhIiwiY2xpZW50U2VjcmV0Ijoid0pQcGFVbW5oRUttVW1hSiJ9.QF1JGh3IQJQvW76DNDvM4NekqHk3Ri8O0XzvKY7YGRA";

const TYPE_WEIGHT = {
    Placement: 3,
    Result: 2,
    Event: 1
};

function calculateScore(notification) {
    const weight = TYPE_WEIGHT[notification.Type] || 0;
    const timeScore = new Date(notification.Timestamp).getTime();

    // smaller multiplier to keep numbers readable
    return weight * 1e10 + timeScore;
}

async function getTopNotifications(n) {
    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${TOKEN}`
        }
    });

    const notifications = response.data.notifications || [];

    const heap = new MinHeap();

    for (let notif of notifications) {
        const score = calculateScore(notif);

        heap.push({
            id: notif.ID,
            type: notif.Type,
            message: notif.Message,
            timestamp: notif.Timestamp,
            weight: TYPE_WEIGHT[notif.Type] || 0,
            score
        });

        if (heap.size() > n) {
            heap.pop();
        }
    }

    const sorted = heap.getAllSorted();

    // add priority (rank)
    return sorted.map((item, index) => ({
        priority: index + 1,
        ...item
    }));
}

module.exports = { getTopNotifications };