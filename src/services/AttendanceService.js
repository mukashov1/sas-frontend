import $api from "../http/api";

export default class AttendanceService {
    static async lessons(studentId) {
        return $api.post("/lessons", { studentId });
    }
}