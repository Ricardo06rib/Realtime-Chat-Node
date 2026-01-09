import { Router } from "express";
export const router = Router();


router.get("/", (req, res) => {
    res.render("login");
})

router.get("/:id", (req, res) => {
    let roomId = req.params.id;
    res.render("chat", { roomId: roomId });
})
