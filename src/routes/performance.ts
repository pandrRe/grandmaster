import { Router } from "express";
import Worker from "../workers/ParameterWorker";
import jwt from "../jwt_config";
import { adminAccess } from "../middlewares/adminAccess";
import { adminSecret } from "../middlewares/adminSecret";

const router = Router();

router.use(jwt);
router.use(adminAccess);
router.use(adminSecret(process.env.ADMIN_SECRET!));

router.put("/parameter", Worker.addParameter);
router.put("/parameter/:parameterId/roster_on_match/:rosterId", Worker.addOrUpdatePerformance);
router.delete("/parameter/:parameterId/roster_on_match/:rosterId", Worker.deletePerformance)


export default router;