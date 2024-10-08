var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
require('dotenv').config();
var tmi = require("tmi.js");
var _a = process.env, TOKEN = _a.TOKEN, BOT_USER_NAME = _a.BOT_USER_NAME, CHANNEL_NAME = _a.CHANNEL_NAME, SERVER_PORT = _a.SERVER_PORT;
var SERVER_URI = "http://localhost:".concat(SERVER_PORT);
var client = new tmi.Client({
    options: { debug: true },
    identity: {
        username: BOT_USER_NAME,
        password: "oauth:".concat(TOKEN)
    },
    channels: [CHANNEL_NAME]
});
client.connect();
client.on('message', function (channel, tags, message, self) { return __awaiter(_this, void 0, void 0, function () {
    var command;
    return __generator(this, function (_a) {
        if (self || !message.startsWith('!'))
            return [2 /*return*/];
        command = message
            .slice(1)
            .split(' ')
            .shift()
            .toLowerCase();
        switch (command) {
            case "прошлая":
                return [2 /*return*/, fetch("".concat(SERVER_URI, "/api/getLastGame")).then(function (res) { return res.json(); }).then(function (res) {
                        var responseText = "\u041F\u0440\u043E\u0448\u043B\u0443\u044E \u0438\u0433\u0440\u0443 ".concat(res.win ? "победил" : "проебал", " \u0437\u0430 ").concat(res.championName, " \u043D\u0430 \u043F\u043E\u0437\u0438\u0446\u0438\u0438 ").concat(res.individualPosition, ". \u041A\u0414\u0410 - ").concat(res.kills, "/").concat(res.deaths, "/").concat(res.assists, ". \u041D\u0430\u0444\u0430\u0440\u043C\u0438\u043B - ").concat(res.totalMinionsKilled + res.neutralMinionsKilled, " \u043C\u043E\u0431\u043E\u0432.");
                        client.say(channel, responseText);
                    })];
        }
        return [2 /*return*/];
    });
}); });
