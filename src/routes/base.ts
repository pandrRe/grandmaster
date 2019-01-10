import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("Grandmaster API");
});

export default router;