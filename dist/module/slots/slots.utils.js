"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeSlots = void 0;
const TimeSlots = (startTime, endTime) => {
    // Set serviceDuration to 60 minutes
    const serviceDuration = 60;
    // Convert start and end times to minutes
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);
    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;
    const totalDuration = endMinutes - startMinutes;
    if (totalDuration <= 0 || totalDuration % serviceDuration !== 0) {
        throw new Error("Invalid time range");
    }
    const numSlots = totalDuration / serviceDuration;
    const timeSlots = [];
    for (let i = 0; i < numSlots; i++) {
        const slotStartMinutes = startMinutes + i * serviceDuration;
        const slotEndMinutes = slotStartMinutes + serviceDuration;
        const slotStartTime = `${String(Math.floor(slotStartMinutes / 60)).padStart(2, "0")}:${String(slotStartMinutes % 60).padStart(2, "0")}`;
        const slotEndTime = `${String(Math.floor(slotEndMinutes / 60)).padStart(2, "0")}:${String(slotEndMinutes % 60).padStart(2, "0")}`;
        timeSlots.push({ startTime: slotStartTime, endTime: slotEndTime });
    }
    return timeSlots;
};
exports.TimeSlots = TimeSlots;
