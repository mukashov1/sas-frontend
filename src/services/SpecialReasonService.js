import $api from "../http/api";

export default class SpecialReasonService {
    static async recordReason(formData) {
        return $api.post("/recordSpecialReason", { formData });
    }
}