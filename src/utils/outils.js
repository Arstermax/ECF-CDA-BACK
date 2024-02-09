const express = require('express')
const app = express();
const router = express.Router();
const mongoose = require("mongoose")
const fs = require('fs')
const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const outils = {
    express,
    router,
    mongoose,
    bcrypt,
    app,
    fs,
    path,
    jwt
}

module.exports = outils;