import $api from "../http/api";

export default class AttendanceService {
    static async lessons(studentId) {
        return $api.get("/lessons", { studentId });
    }
}