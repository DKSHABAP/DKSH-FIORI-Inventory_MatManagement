jQuery.sap.require("sap.ui.core.format.DateFormat");
sap.ui.define([], function () {
	"use strict";
	return {
		f4ValueBind: function (e, t) {
			if (e && t) {
				return e + " (" + t + ")"
			} else if (e && !t) {
				return e
			} else if (!e && t) {
				return t
			} else {
				return ""
			}
		},
		concatenateStrings: function (e, t) {
			if (e && t) {
				return e + " (" + t + ") "
			} else if (e && !t) {
				return e
			} else if (!e && t) {
				return t
			} else {
				return ""
			}
		},
		concatenateStringsStkLt: function (e, t) {
			if (e && t) {
				return e + " " + t
			} else if (e && !t) {
				return e
			} else if (!e && t) {
				return t
			} else {
				return ""
			}
		},
		manufDate: function (e) {
			if (e === "00000000" || e === "" || e === " ") {
				return ""
			} else {
				if (e !== null && e !== "" && e.toString().split("(")[1] !== undefined) {
					var t = parseInt(e.toString().split("(")[1].split(")")[0]);
					var r = sap.ui.core.format.DateFormat.getDateInstance({
						pattern: "dd.MM.yyyy"
					});
					t = new Date(t);
					return r.format(t)
				} else {
					return ""
				}
			}
		},
		date: function (e) {
			if (e === "00000000" || e === "" || e === " ") {
				return "31.12.9999"
			} else {
				if (e !== null && e !== "" && e.toString().split("(")[1] !== undefined) {
					var t = parseInt(e.toString().split("(")[1].split(")")[0]);
					var r = sap.ui.core.format.DateFormat.getDateInstance({
						pattern: "dd.MM.yyyy"
					});
					t = new Date(t);
					return r.format(t)
				} else {
					return ""
				}
			}
		},
		convertToDateToDispFormat: function (e) {
			if (e === "" || e === "00000000" || e === " ") {
				e = "31.12.9999";
				return e
			} else {
				var t = e.substring(0, 4);
				var r = e.substring(4, 6);
				var n = e.substring(6, 8);
				return n + "." + r + "." + t
			}
		},
		convertToDateToDispFormatExp: function (e) {
			if (e === "" || e === "00000000" || e === " ") {
				e = "31.12.9999";
				return e
			} else {
				var t = e.substring(0, 4);
				var r = e.substring(4, 6);
				var n = e.substring(6, 8);
				return n + "." + r + "." + t
			}
		},
		convertToDateToDispFormatManuf: function (e) {
			if (e === "" || e === "00000000" || e === " ") {
				e = ""
			} else {
				var t = e.substring(0, 4);
				var r = e.substring(4, 6);
				var n = e.substring(6, 8);
				return n + "." + r + "." + t
			}
		},
		shortQty: function (e) {
			if (e === "") {
				return "0.000"
			} else {
				return e
			}
		},
		dateTimeFormat: function (e) {
			if (e === "") {
				e = undefined
			} else {
				e = new Date(e);
				if (e) {
					var t = sap.ui.core.format.DateFormat.getTimeInstance({
						pattern: "dd.MM.yyyy HH:mm:ss"
					});
					if (e.getDate().toString().length === 1) {
						var r = "0" + e.getDate()
					} else {
						var r = e.getDate()
					}
					if (e.getMonth().toString().length === 1 && e.getMonth() < 9) {
						var n = "0" + (e.getMonth() + 1)
					} else {
						var n = e.getMonth() + 1
					}
					if (e.getHours().toString().length === 1) {
						var i = "0" + e.getHours()
					} else {
						var i = e.getHours()
					}
					if (e.getMinutes().toString().length === 1) {
						var a = "0" + e.getMinutes()
					} else {
						var a = e.getMinutes()
					}
					if (e.getSeconds().toString().length === 1) {
						var s = "0" + e.getSeconds()
					} else {
						var s = e.getSeconds()
					}
					var r = e.getFullYear() + "-" + n + "-" + r + "T" + i + ":" + a + ":" + s;
					return r
				} else {
					return ""
				}
			}
		},
		rowDesign: function (e, t, r, n) {
			if (e === "SUM" || t === "SUM" || r === "SUM" || n === "SUM") {
				return "Bold"
			} else {
				return "Standard"
			}
		}
	}
});