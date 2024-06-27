"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeSlots = void 0;
const TimeSlots = (startTime, endTime, serviceDuration) => {
    const startHour = parseInt(startTime.split(":")[0], 10);
    const endHour = parseInt(endTime.split(":")[0], 10);
    const startMinutes = startHour * 60;
    const endMinutes = endHour * 60;
    const totalDuration = endMinutes - startMinutes;
    if (totalDuration <= 0 || totalDuration % serviceDuration !== 0) {
        throw new Error("Invalid time range or service duration");
    }
    const numSlots = totalDuration / serviceDuration;
    const timeSlots = [];
    for (let i = 0; i < numSlots; i++) {
        const slotStartTime = `${String(startHour + Math.floor(i * (serviceDuration / 60))).padStart(2, "0")}:00`;
        const slotEndTime = `${String(startHour + Math.floor((i + 1) * (serviceDuration / 60))).padStart(2, "0")}:00`;
        timeSlots.push({ startTime: slotStartTime, endTime: slotEndTime });
    }
    return timeSlots;
};
exports.TimeSlots = TimeSlots;
