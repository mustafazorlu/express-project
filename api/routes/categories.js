const express = require("express");
const router = express.Router();
const Categories = require("../db/models/Categories");
const Response = require("../lib/response");
const CustomError = require("../lib/error");
const Enum = require("../config/enum");

const isAuth = true;

router.all("*", (req, res, next) => {
    if (isAuth) {
        next();
    } else {
        res.json({ success: false, error: "not auth" });
    }
});

router.get("/", async (req, res, next) => {
    try {
        let categories = await Categories.find({});
        res.json(Response.successResponse(categories));
    } catch (err) {
        res.status(err.code || Enum.HTTP_CODES.INT_SERVER_ERROR).json(
            Response.errorResponse(err)
        );
    }

    res.json({ success: true });
});

router.post("/add", async (req, res) => {
    let body = req.body;

    try {
        if (!body.name) {
            throw new CustomError(
                Enum.HTTP_CODES.BAD_REQUEST,
                "Validation Error!",
                "Name fields must be filled"
            );
        }

        let category = new Categories({
            name: body.name,
            is_active: true,
            // created_by: req.user?.id,
        });

        await category.save();

        res.json(Response.successResponse({ success: true }));
    } catch (error) {
        res.status(err.code || Enum.HTTP_CODES.INT_SERVER_ERROR).json(
            Response.errorResponse(error)
        );
    }
});

module.exports = router;
