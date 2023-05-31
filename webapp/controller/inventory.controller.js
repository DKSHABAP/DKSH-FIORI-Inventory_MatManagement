sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel", "sap/m/MessageBox", "sap/ui/core/Fragment",
	"sap/m/MessageToast", "../model/formatter", "sap/m/Token", "sap/ui/export/Spreadsheet"
], function (e, t, s, r, a, o, l, i) {
	"use strict";
	return e.extend("dksh.connectclient.InventoryMatManagement.controller.inventory", {
		formatter: o,
		_doAjax: function (sUrl, sMethod, oData, bAbort) {
			if (bAbort && this.PrevAjax) {
				this.PrevAjax.abort();
			}
			if (oData) {
				oData = JSON.stringify(oData);
			}
			var xhr = $.ajax({
				url: sUrl,
				method: sMethod,
				headers: {
					'Accept': 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
					'Content-Type': 'application/json'
				},
				data: oData || ""
			});
			if (bAbort) {
				this.PrevAjax = xhr;
			}
			return xhr;

		},
		getResourceBundle: function () {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle()
		},
		onAfterRendering: function () {
			this.resourceBundle = this.getView().getModel("i18n").getResourceBundle();
		},

		onInit: function () {
			var that = this;
			this.getView().setModel(new t, "SeacrhParaModel");
			var PersonalizationModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(PersonalizationModel, "PersonalizationModel");
			var tabPersonalizationModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(tabPersonalizationModel, "tabPersonalizationModel");
			this._getUser();
			this.selectedBatchStkLot = [];
			this.selectedSalesOrg = [];
			this.plantToSelectedItems = [];
			this.selectedObjects = [];
			this.selectedVendorMatFrom = [];
			this.selectedVendorMatTo = [];
			this.selectedMatFromItems = [];
			this.selectedMatToItems = [];
			this.SLocToSelectedItems = [];
			this.SLocFromSelectedItems = [];
			this.plantFromSelectedItems = [];
			this.MatGrpFromSelectedItems = [];
			this.MatGrpToSelectedItems = [];
			this.MatGrp4FromSelectedItems = [];
			this.MatGrp4ToSelectedItems = [];
			this.selectedMatDocItems = [];
			this.selectedBatch = [];
			this.selectedVendorMat = [];
			this.selectedMovType = [];
			this.selectedMovType = [];
			this.salesOrgToSelectedItems = [];
			this.salesOrgFromSelectedItems = [];
			this.plantToSelectedItems = [];
			this.getView().getModel("PersonalizationModel").setProperty("/selectVarVisible", true);
			this.getView().getModel("PersonalizationModel").setProperty("/nameVarVisible", false);
			this.getView().getModel("PersonalizationModel").setProperty("/enableCheckBox", false);
			this.getView().getModel("PersonalizationModel").setProperty("/okPersBtnVisible", true);
			this.getView().getModel("PersonalizationModel").setProperty("/savePersBtnVisible", false);
			this.getView().getModel("PersonalizationModel").setProperty("/cancelPersBtnVisible", true);
			this.getView().getModel("PersonalizationModel").setProperty("/deletePersBtnVisible", false);
			this.getView().getModel("PersonalizationModel").setProperty("/createPersBtnVisible", true);
			this.getView().getModel("PersonalizationModel").setProperty("/editPersBtnVisible", true);
			this.getView().getModel("PersonalizationModel").setProperty("/varinatNameValueState", "None");
			this.getView().getModel("PersonalizationModel").refresh();
			var baseModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(baseModel, "baseModel");
			this.getView().getModel("baseModel").setProperty("/rowDesignATP", "Standard");
			this.getView().getModel("baseModel").setProperty("/enableSLocTo", true);
			this.getView().getModel("baseModel").setProperty("/enablematTo", true);
			this.getView().getModel("baseModel").setProperty("/enablematGrpTo", true);
			this.getView().getModel("baseModel").setProperty("/enablematGrp4To", true);
			this.getView().getModel("baseModel").setProperty("/enablePlantTo", true);
			this.getView().getModel("baseModel").setProperty("/enableSalesOrgTo", true);
			this.getView().getModel("baseModel").setProperty("/enableVendorMat", true);
			this.getView().getModel("baseModel").setProperty("/EndingStckSelAllMaterial", true);
			this.getView().getModel("baseModel").setProperty("/batchLevel", false);
			this.getView().getModel("baseModel").setProperty("/blocked", false);
			this.getView().getModel("baseModel").setProperty("/sLocLevel", false);
			this.getView().getModel("baseModel").setProperty("/serialNo", false);
			this.getView().getModel("baseModel").setProperty("/excludeFda", false);
			this.getView().getModel("baseModel").setProperty("/salesUnit", false);
			this.getView().getModel("baseModel").setProperty("/baseUnit", true);
			this.getView().getModel("baseModel").setProperty("/unrestricted", false);
			this.getView().getModel("baseModel").setProperty("/QI", false);
			this.getView().getModel("baseModel").setProperty("/rawMaterial", false);
			this.getView().getModel("baseModel").setProperty("/IncBufferStockStkLotVal", false);
			this.getView().getModel("baseModel").setProperty("/ShowSalesUqtyStkLotVal", false);
			this.getView().getModel("baseModel").setProperty("/ShowAllStocksStkLotVal", true);
			this.getView().getModel("baseModel").setProperty("/onlyQIStkLotVal", false);
			this.getView().getModel("baseModel").setProperty("/onlyUnrestStkLotVal", false);
			this.getView().getModel("baseModel").setProperty("/showStock", false);
			this.getView().getModel("baseModel").setProperty("/showQTY", false);
			this.getView().getModel("baseModel").setProperty("/salesMat", false);
			this.getView().getModel("baseModel").setProperty("/invoiceTableLength", "");
			this.allMaterials = "allMaterials eq " + "'X'";
			this.byEndingPeriod = "byEndingPeriod eq " + "'X'";
			this.onlyShowAllStk = "allStock eq " + "'X'";
			this.getView().getModel("baseModel").setProperty("/EndingStckSelVenConsMat", false);
			this.getView().getModel("baseModel").setProperty("/EndingStckSelchngeOwnStkMat", false);
			this.getView().getModel("baseModel").setProperty("/EndingStckSelEndPrd", true);
			this.getView().getModel("baseModel").setProperty("/EndingStckSelByAsDte", false);
			this.getView().getModel("baseModel").setProperty("/CollapseVisiblity", true);
			this.getView().getModel("baseModel").setProperty("/openVisiblity", false);
			this.getView().getModel("baseModel").setProperty("/SearchVisiblity", true);
			this.getView().getModel("baseModel").refresh();
			that.salesOrgDataAccess = "No Access";
			that.SLOCDataAccess = "No Access";
			that.distrChannelDataAccess = "No Access";
			that.divisionDataAccess = "No Access";
			that.materialGroupDataAccess = "No Access";
			that.materialGroup4DataAccess = "No Access";
			that.plantDataAccess = "No Access";
			that.materialDataAccess = "No Access";
		},

		// [+] START Modification: STRY0014745:MY Enhancements Defaulting mandatory fields -	JAYAMALARJ
		_setDefaultMatGrp: function () {
			var that = this;
			var oComponent = that.getOwnerComponent();
			var oModel = oComponent.getModel("ZDKSH_CC_INVENTORY_HDRLOOKUP_SRV");
			//var oModel = this.getView().getModel("ZDKSH_CC_INVENTORY_HDRLOOKUP_SRV");
			var filters = [];
			var lang = "";
			var lang = "";
			if (sap.ushell) {
				if (sap.ui.getCore().getConfiguration().getLanguage() === "th") {
					lang = "2";
				} else {
					lang = "EN";
				}
			} else {
				lang = "EN";
			}
			lang = lang.toUpperCase();

			var oFilter = new sap.ui.model.Filter({
				filters: [
					new sap.ui.model.Filter("language", sap.ui.model.FilterOperator.EQ, lang),
					new sap.ui.model.Filter("materialGroup", sap.ui.model.FilterOperator.EQ, that.materialGroupDataAccess)
				],
				and: true
			});
			var oMultiInputold = that.byId(that._getId("MatGrpFrom"));
			oMultiInputold.destroyTokens();

			filters.push(oFilter);
			oModel.read("/ZSearchHelp_MaterialGroupSet", {
				async: false,
				filters: filters,
				success: function (oRetrievedResult, oResponse) {
					var DefMatGrpModel = new sap.ui.model.json.JSONModel({
						"results": oRetrievedResult.results
					});
					var oMultiInput = that.byId(that._getId("MatGrpFrom"));
					for (var i = 0; i < oRetrievedResult.results.length; i++) {
						oMultiInput.addToken(new sap.m.Token({
							text: oRetrievedResult.results[i].materialGroup
						}));
						that.MatGrp = "materialGroup eq" + "" + oRetrievedResult.results[i].materialGroup;
						that.MatGrpFromSelectedItems = oRetrievedResult.results[i].materialGroup;
					}
				},
				error: function (oError) {
					/* do nothing */
				}
			});
		},

		_setDefaultPlant: function () {
			var that = this;
			//that._getPersonalizationDetails("keyMat.Movement.Ind.Ind");
			// if (tabName !== "keyMat.Movement.Ind") {
			//that.plantFrag = sap.ui.xmlfragment("dksh.connectclient.InventoryMatManagement.Fragments.plant", that);
			//that.getView().addDependent(that.plantFrag);
			var oComponent = that.getOwnerComponent();
			var oModel = oComponent.getModel("ZDKSH_CC_INVENTORY_HDRLOOKUP_SRV");
			//console.log(oModel.getMetadata());
			var filters = [];
			var lang = "";
			var lang = "";
			if (sap.ushell) {
				if (sap.ui.getCore().getConfiguration().getLanguage() === "th") {
					lang = "2";
				} else {
					lang = "EN";
				}
			} else {
				lang = "EN";
			}
			lang = lang.toUpperCase();

			var oFilter = new sap.ui.model.Filter({
				filters: [
					new sap.ui.model.Filter("language", sap.ui.model.FilterOperator.EQ, lang),
					new sap.ui.model.Filter("plant", sap.ui.model.FilterOperator.EQ, that.plantDataAccess)
				],
				and: true
			});
			filters.push(oFilter);
			oModel.read("/ZSearchHelp_PlantSet", {
				async: false,
				filters: filters,
				success: function (oRetrievedResult, oResponse) {
					var DefPlantModel = new sap.ui.model.json.JSONModel({
						"results": oRetrievedResult.results
					});
					var oMultiInput = that.byId(that._getId("PlantFrom"));
					for (var i = 0; i < oRetrievedResult.results.length; i++) {
						oMultiInput.addToken(new sap.m.Token({
							text: oRetrievedResult.results[i].plant
						}));
						that.plant = "plant eq" + "" + oRetrievedResult.results[i].plant;
						that.plantFromSelectedItems = oRetrievedResult.results[i].plant;
					}
				},
				error: function (oError) {
					/* do nothing */
				}
			});
			// }
		},
		// [+] END Modification: STRY0014745:MY Enhancements Defaulting mandatory fields -	JAYAMALARJ

		_getUser: function () {
			var e = "/services/userapi/attributes";
			var t = new sap.m.BusyDialog;
			t.open();
			this._doAjax(e, "GET", "", true).then(e => {
				t.close();
				var s = new sap.ui.model.json.JSONModel;
				this.getView().setModel(s, "oUserModel");
				this.getView().getModel("oUserModel").setProperty("/userID", e.name);
				this.getView().getModel("oUserModel").setProperty("/email", e.email);
				this._getUserDetail(e.name);
				// [+] START Modification: STRY0014745:MY Enhancements Defaulting mandatory fields -	JAYAMALARJ
				this.clearTabData();
				this._getPersonalizationDetails("keyMat.Movement.Ind");
				// [+] END Modification: STRY0014745:MY Enhancements Defaulting mandatory fields -	JAYAMALARJ
			}, e => {
				t.close();
				s.error(e.responseText)
			});
			var that = this;
		},

		_getUserDetail: function (userId) {
			var that = this;
			var oModel = new sap.ui.model.json.JSONModel();
			that.getView().setModel(oModel, "oModel");

			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			oModel.loadData("/DKSHJavaService/userDetails/findAllRightsForUserInDomain/" + userId + "&cc", null, true);
			oModel.attachRequestCompleted(function (data) {
				busyDialog.close();
				if (!data.getParameters().errorobject) {
					var custAttribute = data.getSource().getData();
					if (custAttribute.message)
						that.allAccess = false;
					// var custAttribute = data.getSource().getData();
					if (custAttribute.ATR01 !== null) {
						that.salesOrgDataAccess = custAttribute.ATR01;

					}
					if (custAttribute.ATR02 !== null) {
						that.distrChannelDataAccess = custAttribute.ATR02;
						// that._distChannelList();
					}
					if (custAttribute.ATR03 !== null) {
						that.divisionDataAccess = custAttribute.ATR03;
					}
					if (custAttribute.ATR04 !== null) {
						that.materialGroupDataAccess = custAttribute.ATR04;
					}
					if (custAttribute.ATR05 !== null) {
						that.materialGroup4DataAccess = custAttribute.ATR05;
					}
					if (custAttribute.ATR10 !== null) {
						that.SLOCDataAccess = custAttribute.ATR10;
					}
					if (custAttribute.ATR09 !== null) {
						that.plantDataAccess = custAttribute.ATR09;
					}
					if (custAttribute.ATR07 !== null) {
						that.materialDataAccess = custAttribute.ATR07;
					}
				}
				// else {

				// 	sap.m.MessageBox.error(data.getParameters().errorobject.responseText);
				// }
			});
			oModel.attachRequestFailed(function (oEvent) {
				busyDialog.close();
				// if (oEvent.status == 409)
				that.allAccess = false;
				// else
				// sap.m.MessageBox.error(oEvent.getParameters().responseText);
			});

			// oLoggedInUserDetailModel.attachRequestCompleted(function (oEvent) {
			// data access control

			// },
		},
		handleBack: function () {
			var e = sap.ushell.Container.getService("CrossApplicationNavigation");
			e.toExternal({
				target: {
					semanticObject: "",
					action: ""
				}
			})
		},
		// onPressDetailEndStk: function (e) {
		// 	if (sap.ui.Device.system.phone === true) {
		// 		var t = e.getSource().getBindingContext("endingStckTableModel").getObject();
		// 		var s = e.getSource();
		// 		if (!this._oPopover) {
		// 			r.load({
		// 				name: "incture.com.Inventory.Fragments.EndingStockPopover",
		// 				controller: this
		// 			}).then(function (e) {
		// 				this._oPopover = e;
		// 				this.getView().addDependent(this._oPopover);
		// 				var r = new sap.ui.model.json.JSONModel({
		// 					results: t
		// 				});
		// 				this._oPopover.setModel(r, "endingStckPopoverModel");
		// 				this._oPopover.getModel("endingStckPopoverModel").refresh();
		// 				this._oPopover.setModel(this.getView().getModel("PersonalizationModel"), "PersonalizationModel");
		// 				this._oPopover.getModel("PersonalizationModel").refresh();
		// 				if (sap.ui.Device.system.phone === true) {
		// 					this._oPopover.setPlacement("Bottom");
		// 					this._oPopover.openBy(s)
		// 				} else {
		// 					this._oPopover.openBy(s)
		// 				}
		// 			}.bind(this))
		// 		} else {
		// 			var a = new sap.ui.model.json.JSONModel({
		// 				results: t
		// 			});
		// 			this._oPopover.setModel(this.getView().getModel("PersonalizationModel"), "PersonalizationModel");
		// 			this._oPopover.getModel("PersonalizationModel").refresh();
		// 			this._oPopover.setModel(a, "endingStckPopoverModel");
		// 			this._oPopover.getModel("endingStckPopoverModel").refresh();
		// 			if (sap.ui.Device.system.phone === true) {
		// 				this._oPopover.setPlacement("Bottom");
		// 				this._oPopover.openBy(s)
		// 			} else {
		// 				this._oPopover.openBy(s)
		// 			}
		// 		}
		// 	}
		// },
		// onPressDetailExpStk: function (e) {
		// 	if (sap.ui.Device.system.phone === true) {
		// 		var t = e.getSource().getBindingContext("expiryStckTableModel").getObject();
		// 		var s = e.getSource();
		// 		if (!this._oPopover) {
		// 			r.load({
		// 				name: "incture.com.Inventory.Fragments.ExpiryStockPopover",
		// 				controller: this
		// 			}).then(function (e) {
		// 				this._oPopover = e;
		// 				this.getView().addDependent(this._oPopover);
		// 				var r = new sap.ui.model.json.JSONModel({
		// 					results: t
		// 				});
		// 				this._oPopover.setModel(r, "expiryStckPopoverModel");
		// 				this._oPopover.getModel("expiryStckPopoverModel").refresh();
		// 				this._oPopover.setModel(this.getView().getModel("PersonalizationModel"), "PersonalizationModel");
		// 				this._oPopover.getModel("PersonalizationModel").refresh();
		// 				if (sap.ui.Device.system.phone === true) {
		// 					this._oPopover.setPlacement("Bottom");
		// 					this._oPopover.openBy(s)
		// 				} else {
		// 					this._oPopover.openBy(s)
		// 				}
		// 			}.bind(this))
		// 		} else {
		// 			var a = new sap.ui.model.json.JSONModel({
		// 				results: t
		// 			});
		// 			this._oPopover.setModel(this.getView().getModel("PersonalizationModel"), "PersonalizationModel");
		// 			this._oPopover.getModel("PersonalizationModel").refresh();
		// 			this._oPopover.setModel(a, "expiryStckPopoverModel");
		// 			this._oPopover.getModel("expiryStckPopoverModel").refresh();
		// 			if (sap.ui.Device.system.phone === true) {
		// 				this._oPopover.setPlacement("Bottom");
		// 				this._oPopover.openBy(s)
		// 			} else {
		// 				this._oPopover.openBy(s)
		// 			}
		// 		}
		// 	}
		// },
		onPressDetailMatMov: function (e) {
			if (sap.ui.Device.system.phone === true) {
				var t = e.getSource().getBindingContext("mavMovTableModel").getObject();
				var s = e.getSource();
				if (!this._oPopover) {
					r.load({
						name: "dksh.connectclient.InventoryMatManagement.Fragments.MatMovPopover",
						controller: this
					}).then(function (e) {
						this._oPopover = e;
						this.getView().addDependent(this._oPopover);
						var r = new sap.ui.model.json.JSONModel({
							results: t
						});
						this._oPopover.setModel(r, "matMovPopoverModel");
						this._oPopover.getModel("matMovPopoverModel").refresh();
						this._oPopover.setModel(this.getView().getModel("PersonalizationModel"), "PersonalizationModel");
						this._oPopover.getModel("PersonalizationModel").refresh();
						if (sap.ui.Device.system.phone === true) {
							this._oPopover.setPlacement("Bottom");
							this._oPopover.openBy(s)
						} else {
							this._oPopover.openBy(s)
						}
					}.bind(this))
				} else {
					var a = new sap.ui.model.json.JSONModel({
						results: t
					});
					this._oPopover.setModel(a, "matMovPopoverModel");
					this._oPopover.getModel("matMovPopoverModel").refresh();
					this._oPopover.setModel(this.getView().getModel("PersonalizationModel"), "PersonalizationModel");
					this._oPopover.getModel("PersonalizationModel").refresh();
					if (sap.ui.Device.system.phone === true) {
						this._oPopover.setPlacement("Bottom");
						this._oPopover.openBy(s)
					} else {
						this._oPopover.openBy(s)
					}
				}
			}
		},
		// onPressDetailATP: function (e) {
		// 	if (sap.ui.Device.system.phone === true) {
		// 		var t = e.getSource().getBindingContext("ATPOverviewTableModel").getObject();
		// 		var s = e.getSource();
		// 		if (!this._oPopover) {
		// 			r.load({
		// 				name: "incture.com.Inventory.Fragments.ATPPopover",
		// 				controller: this
		// 			}).then(function (e) {
		// 				this._oPopover = e;
		// 				this.getView().addDependent(this._oPopover);
		// 				var r = new sap.ui.model.json.JSONModel({
		// 					results: t
		// 				});
		// 				this._oPopover.setModel(r, "ATPPopoverModel");
		// 				this._oPopover.getModel("ATPPopoverModel").refresh();
		// 				this._oPopover.setModel(this.getView().getModel("PersonalizationModel"), "PersonalizationModel");
		// 				this._oPopover.getModel("PersonalizationModel").refresh();
		// 				if (sap.ui.Device.system.phone === true) {
		// 					this._oPopover.setPlacement("Bottom");
		// 					this._oPopover.openBy(s)
		// 				} else {
		// 					this._oPopover.openBy(s)
		// 				}
		// 			}.bind(this))
		// 		} else {
		// 			this._oPopover.setModel(this.getView().getModel("PersonalizationModel"), "PersonalizationModel");
		// 			this._oPopover.getModel("PersonalizationModel").refresh();
		// 			if (sap.ui.Device.system.phone === true) {
		// 				this._oPopover.setPlacement("Bottom");
		// 				this._oPopover.openBy(s)
		// 			} else {
		// 				this._oPopover.openBy(s)
		// 			}
		// 		}
		// 	}
		// },
		onTabSelection: function (e) {
			this.selectedTab = e.getParameters().selectedKey;
			// if (this.selectedTab !== "KeySelCust") {
			this.clearTabData();
			this._getPersonalizationDetails("keyMat.Movement.Ind")
			this._setDefaultPlant();
			this._setDefaultMatGrp();
			// }
			this.getView().getModel("baseModel").setProperty("/SearchVisiblity", true);
			this.getView().getModel("baseModel").refresh()
		},
		onPressCollapse: function (e) {
			this.getView().getModel("baseModel").setProperty("/SearchVisiblity", false);
			this.getView().getModel("baseModel").setProperty("/CollapseVisiblity", false);
			this.getView().getModel("baseModel").setProperty("/openVisiblity", true);
			this.getView().getModel("baseModel").refresh()
		},
		onPressOpen: function (e) {
			this.getView().getModel("baseModel").setProperty("/SearchVisiblity", true);
			this.getView().getModel("baseModel").setProperty("/CollapseVisiblity", true);
			this.getView().getModel("baseModel").setProperty("/openVisiblity", false);
			this.getView().getModel("baseModel").refresh()
		},
		onReportSelection: function (e) {
			// this.selectedTab = e.getSource().getSelectedKey();
			this.selectedTab = "keyMat.Movement.Ind";
			this.getView().byId("ID_TAB_BAR_PROV_APP").setSelectedKey(e.getSource().getSelectedKey());
			// if (this.selectedTab !== "KeySelCust") {
			this.clearTabData();
			this._getPersonalizationDetails(this.selectedTab)
				// }
			return
		},
		onVariantEdit: function () {
			var e = this.FilterPersonalization.getModel("FilterPersonalization");
			if (e.getData().results.personalizationData.currentVariant === "Default") {
				a.show("Cannot edit default variant");
				return
			}
			e.setProperty("/results/action", "Edit");
			e.setProperty("/results/okPersBtnVisible", false);
			e.setProperty("/results/enableCheckBox", true);
			e.setProperty("/results/savePersBtnVisible", true);
			e.setProperty("/results/deletePersBtnVisible", true);
			e.setProperty("/results/selectVarVisible", true);
			e.setProperty("/results/nameVarVisible", false);
			e.refresh();
			this.onSelectvarian();
			a.show("Select a variant to edit")
		},
		onVariantCreate: function () {
			var e = this.FilterPersonalization.getModel("FilterPersonalization");
			e.setProperty("/results/action", "Create");
			e.setProperty("/results/selectVarVisible", false);
			e.setProperty("/results/nameVarVisible", true);
			e.setProperty("/results/enableCheckBox", true);
			e.setProperty("/results/okPersBtnVisible", false);
			e.setProperty("/results/savePersBtnVisible", true);
			e.setProperty("/results/newVariantName", "");
			var t = e.getData().results.personalizationData.userPersonaDto;
			for (var s = 0; s < t.length; s++) {
				t[s].status = false
			}
			e.setProperty("/results/personalizationData/userPersonaDto", t);
			this.FilterPersonalization.getModel("FilterPersonalization").refresh()
		},
		onChangeOnlyQIStkLot: function (e) {
			var t = e.getParameters().selected;
			if (t === true) {
				this.onlyQI = "onlyStockInspection eq " + "'X'"
			} else {
				this.onlyQI = undefined
			}
		},
		onChangeShowAllStocksStkLot: function (e) {
			var t = e.getParameters().selected;
			if (t === true) {
				this.onlyShowAllStk = "allStock eq " + "'X'"
			} else {
				this.onlyShowAllStk = undefined
			}
		},
		handleChangeExpDateFrom: function (e) {
			var t = e.getParameters().value;
			if (t === NaN || t === "") {
				t = ""
			}
			var s = this.formatter.dateTimeFormat(t);
			this.expiryDateFrom = s
		},
		handleChangeExpDateTo: function (e) {
			if (!this.expiryDateFrom) {
				a.show("Add Expiry Date from");
				return
			} else {
				var t = e.getParameters().value;
				if (t === NaN || t === "") {
					t = ""
				}
				var s = this.formatter.dateTimeFormat(t);
				this.expiryDateTo = s
			}
		},
		onChangeShowSalesUqtyStkLot: function (e) {
			var t = e.getParameters().selected;
			if (t === true) {
				this.onlyShowSalesUQ = "salesUnitQty eq " + "'X'"
			} else {
				this.onlyShowSalesUQ = undefined
			}
		},
		onChangeIncBufferStockStkLot: function (e) {
			var t = e.getParameters().selected;
			if (t === true) {
				this.onlyChBufferStk = "bufferStock eq " + "'X'"
			} else {
				this.onlyChBufferStk = undefined
			}
		},
		onChangeBatchLevelStkLot: function (e) {
			var t = e.getParameters().selected;
			if (t === true) {
				this.BatchNum = "batchNum  eq " + "'X'"
			} else {
				this.BatchNum = undefined
			}
		},
		onSelRawMat: function (e) {
			var t = e.getParameters().selected;
			if (t === true) {
				this.RawMat = "rawMaterial  eq " + "'X'"
			} else {
				this.RawMat = undefined
			}
		},
		onSelShowQty: function (e) {
			var t = e.getParameters().selected;
			if (t === true) {
				this.showQty = "onOrderQty  eq " + "'X'"
			} else {
				this.showQty = undefined
			}
		},
		onIncSalesMat: function (e) {
			var t = e.getParameters().selected;
			if (t === true) {
				this.SalesMat = "salesMaterial  eq " + "'X'"
			} else {
				this.SalesMat = undefined
			}
		},
		onShowZeroStk: function (e) {
			var t = e.getParameters().selected;
			if (t === true) {
				this.ZeroStk = "zeroStock  eq " + "'X'"
			} else {
				this.ZeroStk = undefined
			}
		},
		onChangeOnlyQIStkLot: function (e) {
			var t = e.getParameters().selected;
			if (t === true) {
				this.onlyQI = "onlyStockInspection eq " + "'X'"
			} else {
				this.onlyQI = undefined
			}
		},
		onChangeShowAllStocksStkLot: function (e) {
			var t = e.getParameters().selected;
			if (t === true) {
				this.onlyShowAllStk = "allStock eq " + "'X'"
			} else {
				this.onlyShowAllStk = undefined
			}
		},
		onChangeShowSalesUqtyStkLot: function (e) {
			var t = e.getParameters().selected;
			if (t === true) {
				this.onlyShowSalesUQ = "salesUnitQty eq " + "'X'"
			} else {
				this.onlyShowSalesUQ = undefined
			}
		},
		onChangeIncBufferStockStkLot: function (e) {
			var t = e.getParameters().selected;
			if (t === true) {
				this.onlyChBufferStk = "bufferStock eq " + "'X'"
			} else {
				this.onlyChBufferStk = undefined
			}
		},
		onChangeBatchLevelStkLot: function (e) {
			var t = e.getParameters().selected;
			if (t === true) {
				this.BatchNum = "batchNum  eq " + "'X'"
			} else {
				this.BatchNum = undefined
			}
		},
		onSelRawMat: function (e) {
			var t = e.getParameters().selected;
			if (t === true) {
				this.RawMat = "rawMaterial  eq " + "'X'"
			} else {
				this.RawMat = undefined
			}
		},
		onSelShowQty: function (e) {
			var t = e.getParameters().selected;
			if (t === true) {
				this.showQty = "onOrderQty  eq " + "'X'"
			} else {
				this.showQty = undefined
			}
		},
		onIncSalesMat: function (e) {
			var t = e.getParameters().selected;
			if (t === true) {
				this.SalesMat = "salesMaterial  eq " + "'X'"
			} else {
				this.SalesMat = undefined
			}
		},
		onShowZeroStk: function (e) {
			var t = e.getParameters().selected;
			if (t === true) {
				this.ZeroStk = "zeroStock  eq " + "'X'"
			} else {
				this.ZeroStk = undefined
			}
		},
		onChangeCheckbox: function (e) {
			var t = this.FilterPersonalization.getModel("FilterPersonalization").getData().results.personalizationData.userPersonaDto;
			var s = parseInt(e.getSource().getBindingContext("FilterPersonalization").getPath().split("/")[3]);
			if (e.getSource().getSelected() === true) {
				for (var r = 0; r < t.length; r++) {
					if (r === s) {
						t[r].status = "true"
					}
					if (this.FilterPersonalization.getModel("FilterPersonalization").getProperty("/results/action") === "Create") {
						t[r].id = ""
					}
					this.selectedObjects = t
				}
			} else {
				for (var a = 0; a < t.length; a++) {
					if (a === s) {
						t[a].status = "false"
					}
				}
				this.selectedObjects = t
			}
		},
		onSelectvarian: function (e) {
			var t = "Web";
			if (sap.ui.Device.system.phone === true) {
				t = "Phone"
			}
			var r = this;
			var o = this.getView().getModel("oUserModel").getData().userID;
			// this.selectedTab = this.getView().byId("ID_TAB_BAR_PROV_APP").getSelectedKey();
			this.selectedTab = "keyMat.Movement.Ind";
			if (e) {
				var l = e.getSource().getSelectedKey()
			} else {
				var l = r.getView().getModel("PersonalizationModel").getProperty("/personalizationData/currentVariant")
			}
			var i = "/DKSHJavaService/variant/getvariantLists/" + o + "/" + this.selectedTab + "/" + l + "/" + t;
			var n = new sap.m.BusyDialog;
			n.open();
			this._doAjax(i, "GET").then(e => {
				n.close();
				var e = e.userPersonaDto;
				if (this.FilterPersonalization.getModel("FilterPersonalization").getProperty("/results/action") === "Edit") {
					r.getView().getModel("PersonalizationModel").setProperty("/personalizationData/userPersonaDto", e);
					r.FilterPersonalization.getModel("FilterPersonalization").setProperty("/results/personalizationData/userPersonaDto", e);
					r.FilterPersonalization.getModel("FilterPersonalization").refresh();
					r.getView().getModel("PersonalizationModel").refresh();
					if (r.FilterPersonalization.getModel("FilterPersonalization").getProperty("/results/personalizationData/currentVariant") ===
						"Default") {
						r.FilterPersonalization.getModel("FilterPersonalization").setProperty("/results/action", "");
						r.FilterPersonalization.getModel("FilterPersonalization").setProperty("/results/enableCheckBox", false);
						r.FilterPersonalization.getModel("FilterPersonalization").setProperty("/results/savePersBtnVisible", false);
						r.FilterPersonalization.getModel("FilterPersonalization").setProperty("/okPersBtnVisible", true);
						r.FilterPersonalization.getModel("FilterPersonalization").setProperty("/results/deletePersBtnVisible", false);
						r.FilterPersonalization.getModel("FilterPersonalization").setProperty("/results/selectVarVisible", true);
						r.FilterPersonalization.getModel("FilterPersonalization").setProperty("/results/nameVarVisible", false);
						a.show("Cannot edit default variant");
						r.FilterPersonalization.getModel("FilterPersonalization").refresh()
					}
				} else {
					r.getView().getModel("PersonalizationModel").setProperty("/personalizationData/userPersonaDto", e);
					r.FilterPersonalization.getModel("FilterPersonalization").setProperty("results/personalizationData/userPersonaDto", e);
					r.FilterPersonalization.getModel("FilterPersonalization").refresh();
					r.getView().getModel("PersonalizationModel").refresh()
				}
			}, e => {
				n.close();
				s.error(e.responseText)
			})
		},
		onPersonlizationClose: function () {
			var e = this;
			var t = this.getView().getModel("PersonalizationModel");
			if (!this.FilterPersonalization) {
				this.FilterPersonalization = sap.ui.xmlfragment("dksh.connectclient.InventoryMatManagement.Fragments.FilterPersonalization", this);
				this.getView().addDependent(this.FilterPersonalization)
			}
			var s = new sap.ui.model.json.JSONModel({
				results: this.getView().getModel("PersonalizationModel").getData()
			});
			this.FilterPersonalization.setModel(s, "FilterPersonalization");
			this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/results/selectVarVisible", true);
			this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/results/nameVarVisible", false);
			this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/results/enableCheckBox", false);
			this.FilterPersonalization.getModel("FilterPersonalization").refresh();
			this.FilterPersonalization.getModel("FilterPersonalization").refresh();
			this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/okPersBtnVisible", true);
			this.getView().getModel("PersonalizationModel").setProperty("/okPersBtnVisible", true);
			this.getView().getModel("PersonalizationModel").setProperty("/savePersBtnVisible", false);
			this.getView().getModel("PersonalizationModel").setProperty("/cancelPersBtnVisible", true);
			this.getView().getModel("PersonalizationModel").setProperty("/deletePersBtnVisible", false);
			this.getView().getModel("PersonalizationModel").setProperty("/createPersBtnVisible", true);
			this.getView().getModel("PersonalizationModel").setProperty("/editPersBtnVisible", true);
			this.getView().getModel("PersonalizationModel").setProperty("/varinatNameValueState", "None");
			this.selectedObjects = [];
			this.getView().getModel("PersonalizationModel").refresh();
			this.FilterPersonalization.close();
			e._getPersonalizationDetails("keyMat.Movement.Ind")
		},
		onVariantOK: function () {
			var e = this;
			var t = this.getView().getModel("PersonalizationModel");
			if (!this.FilterPersonalization) {
				this.FilterPersonalization = sap.ui.xmlfragment("dksh.connectclient.InventoryMatManagement.Fragments.FilterPersonalization", this);
				this.getView().addDependent(this.FilterPersonalization)
			}
			var s = new sap.ui.model.json.JSONModel({
				results: this.getView().getModel("PersonalizationModel").getData()
			});
			this.FilterPersonalization.setModel(s, "FilterPersonalization");
			this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/results/selectVarVisible", true);
			this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/results/nameVarVisible", false);
			this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/results/enableCheckBox", false);
			this.FilterPersonalization.getModel("FilterPersonalization").refresh();
			this.FilterPersonalization.getModel("FilterPersonalization").refresh();
			this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/okPersBtnVisible", true);
			this.getView().getModel("PersonalizationModel").setProperty("/savePersBtnVisible", false);
			this.getView().getModel("PersonalizationModel").setProperty("/cancelPersBtnVisible", true);
			this.getView().getModel("PersonalizationModel").setProperty("/deletePersBtnVisible", false);
			this.getView().getModel("PersonalizationModel").setProperty("/createPersBtnVisible", true);
			this.getView().getModel("PersonalizationModel").setProperty("/editPersBtnVisible", true);
			this.getView().getModel("PersonalizationModel").setProperty("/varinatNameValueState", "None");
			this.selectedObjects = [];
			this.getView().getModel("PersonalizationModel").refresh();
			this.FilterPersonalization.close()
		},
		valueHelpRequestPlant: function (e) {
			var t = this;
			this.plantPlaceholder = e.getSource().getPlaceholder();
			if (t.plantDataAccess === "No Access") {
				a.show("No Data Access")
			} else {
				var t = this;
				if (!t.plantFrag) {
					t.plantFrag = sap.ui.xmlfragment("dksh.connectclient.InventoryMatManagement.Fragments.plant", t);
					t.getView().addDependent(t.plantFrag);
					var s = this.getView().getModel("ZDKSH_CC_INVENTORY_HDRLOOKUP_SRV");
					var r = [];
					var o = "";
					if (sap.ushell) {
						if (sap.ui.getCore().getConfiguration().getLanguage() === "th") {
							o = "2"
						} else {
							o = "EN"
						}
					} else {
						o = "EN"
					}
					o = o.toUpperCase();
					var l = new sap.ui.model.Filter({
						filters: [new sap.ui.model.Filter("language", sap.ui.model.FilterOperator.EQ, o),
							new sap.ui.model.Filter("plant", sap.ui.model.FilterOperator.EQ, this.plantDataAccess)
						],
						and: true
					});
					r.push(l);
					var i = new sap.m.BusyDialog;
					i.open();
					s.read("/ZSearchHelp_PlantSet", {
						async: false,
						filters: r,
						success: function (e, s) {
							i.close();
							var r = new sap.ui.model.json.JSONModel({
								results: e.results
							});
							t.plantFrag.setModel(r, "plantModel");
							t.plantFrag.open()
						},
						error: function (e) {
							i.close();
							var s = "";
							if (e.statusCode === 504) {
								s = "Request timed-out. Please try again!";
								t.errorMsg(s)
							} else {
								s = JSON.parse(e.responseText);
								s = s.error.message.value;
								t.errorMsg(s)
							}
						}
					})
				} else {
					t.plantFrag.open()
				}
			}
		},
		valueHelpRequestMaterialGrp4: function (e) {
			this.matGrp4Placeholder = e.getSource().getPlaceholder();
			var t = this;
			if (t.materialGroup4DataAccess === "No Access") {
				a.show("No Data Access")
			} else {
				if (!t.materialGroup4) {
					t.materialGroup4 = sap.ui.xmlfragment("dksh.connectclient.InventoryMatManagement.Fragments.materialGroup4", t);
					t.getView().addDependent(t.materialGroup4);
					var s = this.getView().getModel("ZDKSH_CC_INVENTORY_HDRLOOKUP_SRV");
					var r = [];
					var o = "";
					if (sap.ushell) {
						if (sap.ui.getCore().getConfiguration().getLanguage() === "th") {
							o = "2"
						} else {
							o = "EN"
						}
					} else {
						o = "EN"
					}
					o = o.toUpperCase();
					var l = new sap.ui.model.Filter({
						filters: [new sap.ui.model.Filter("language", sap.ui.model.FilterOperator.EQ, o), new sap.ui.model.Filter("materialGroup4",
							sap.ui.model.FilterOperator.EQ, t.materialGroup4DataAccess)],
						and: true
					});
					r.push(l);
					var i = new sap.m.BusyDialog;
					i.open();
					s.read("/ZSearchHelp_MaterialGroup4Set", {
						async: false,
						filters: r,
						success: function (e, s) {
							i.close();
							var r = new sap.ui.model.json.JSONModel({
								results: e.results
							});
							t.materialGroup4.setModel(r, "materialGrp4Model");
							t.materialGroup4.open()
						},
						error: function (e) {
							i.close();
							var s = "";
							if (e.statusCode === 504) {
								s = "Request timed-out. Please try again!";
								t.errorMsg(s)
							} else {
								s = JSON.parse(e.responseText);
								s = s.error.message.value;
								t.errorMsg(s)
							}
						}
					})
				} else {
					t.materialGroup4.open()
				}
			}
		},
		valueHelpRequestMaterialGrp: function (e) {
			this.matGrpPlaceholder = e.getSource().getPlaceholder();
			var t = this;
			if (t.materialGroupDataAccess === "No Access") {
				a.show("No Data Access")
			} else {
				if (!t.MaterialGroup) {
					t.MaterialGroup = sap.ui.xmlfragment("dksh.connectclient.InventoryMatManagement.Fragments.MaterialGroup", t);
					t.getView().addDependent(t.MaterialGroup);
					var s = this.getView().getModel("ZDKSH_CC_INVENTORY_HDRLOOKUP_SRV");
					var r = [];
					var o = "";
					var o = "";
					if (sap.ushell) {
						if (sap.ui.getCore().getConfiguration().getLanguage() === "th") {
							o = "2"
						} else {
							o = "EN"
						}
					} else {
						o = "EN"
					}
					o = o.toUpperCase();
					var l = new sap.ui.model.Filter({
						filters: [new sap.ui.model.Filter("language", sap.ui.model.FilterOperator.EQ, o), new sap.ui.model.Filter("materialGroup", sap
							.ui.model.FilterOperator.EQ, t.materialGroupDataAccess)],
						and: true
					});
					r.push(l);
					var i = new sap.m.BusyDialog;
					i.open();
					s.read("/ZSearchHelp_MaterialGroupSet", {
						async: false,
						filters: r,
						success: function (e, s) {
							i.close();
							var r = new sap.ui.model.json.JSONModel({
								results: e.results
							});
							t.MaterialGroup.setModel(r, "MaterialGroupModel");
							t.MaterialGroup.open()
						},
						error: function (e) {
							i.close();
							var s = "";
							if (e.statusCode === 504) {
								s = "Request timed-out. Please try again!";
								t.errorMsg(s)
							} else {
								s = JSON.parse(e.responseText);
								s = s.error.message.value;
								t.errorMsg(s)
							}
						}
					})
				} else {
					t.MaterialGroup.open()
				}
			}
		},
		valueHelpRequestStoLoc: function (e) {
			var t = "";
			var s;
			var r = "/DKSHODataService/sap/opu/odata/sap/ZDKSH_CC_INVENTORY_HDRLOOKUP_SRV/ZSearchHelp_SlocSet?$filter=";
			if (this.plantFromSelectedItems.length === 0) {
				r = r + "plant eq (" + "'" + this.plantDataAccess + "'" + ")"
			} else if (this.plantFromSelectedItems.length === 1) {
				if (this.plantToSelectedItems.length === 1) {
					s = "( plant ge " + "'" + this.plantFromSelectedItems[0] + "'" + " and " + "plant le " + "'" + this.plantToSelectedItems[0] +
						"' )"
				} else {
					s = "plant eq " + "'" + this.plantFromSelectedItems[0] + "'"
				}
				if (r.length === 97) {
					r = r + s
				} else {
					r = r + " " + "and" + " " + s
				}
			} else if (this.plantFromSelectedItems.length > 1) {
				for (var o = 0; o < this.plantFromSelectedItems.length; o++) {
					if (s === undefined) {
						s = "(plant eq " + "'" + this.plantFromSelectedItems[o] + "'"
					} else {
						if (o === this.plantFromSelectedItems.length - 1) {
							s = s + " " + "or" + " " + "plant eq " + "'" + this.plantFromSelectedItems[o] + "')"
						} else {
							s = s + " " + "or" + " " + "plant eq " + "'" + this.plantFromSelectedItems[o] + "'"
						}
					}
				}
				if (r.length === 97) {
					r = r + s
				} else {
					r = r + " " + "and" + " " + s
				}
			}
			var l = this;
			if (l.SLOCDataAccess === "No Access") {
				a.show("No Data Access")
			} else {
				this.SLocPlaceholder = e.getSource().getPlaceholder();
				l.StorageLocation = sap.ui.xmlfragment("dksh.connectclient.InventoryMatManagement.Fragments.StorageLocation", l);
				l.getView().addDependent(l.StorageLocation);
				var i = this.getView().getModel("ZDKSH_CC_INVENTORY_HDRLOOKUP_SRV");
				var n = [];
				var d = "";
				if (sap.ushell) {
					if (sap.ui.getCore().getConfiguration().getLanguage() === "th") {
						d = "2"
					} else {
						d = "EN"
					}
				} else {
					d = "EN"
				}
				d = d.toUpperCase();
				r = r + " and " + "storageLocation eq " + "'" + l.SLOCDataAccess + "'" + " and " + "language eq " + "'" + d + "'" +
					"&$format=json";
				var h = new sap.m.BusyDialog;
				h.open();
				$.ajax({
					url: r,
					method: "GET",
					async: true,
					success: function (e, t, s) {
						h.close();
						var r = new sap.ui.model.json.JSONModel({
							results: e.d.results
						});
						l.StorageLocation.setModel(r, "stoLocModel");
						l.StorageLocation.open()
					},
					error: function (e, t, s) {
						h.close();
						var r = "";
						if (e.status === 504) {
							r = "Request timed-out. Please try again using different search filters or add more search filters.";
							l.errorMsg(r)
						} else {
							r = e.responseJSON.error.message.value;
							l.errorMsg(r)
						}
					}
				})
			}
		},
		onVariantSave: function (e) {
			if (this.selectedObjects.length === 0) {
				a.show("Save only after edit");
				return
			}
			var t = this;
			var r = e.getSource();
			var o = this.FilterPersonalization.getModel("FilterPersonalization");
			if (o.getProperty("/results/action") === "Create") {
				if (o.getData().results.newVariantName !== undefined && o.getData().results.newVariantName !== "") {
					for (var l = 0; l < o.getData().results.personalizationData.variantName.length; l++) {
						if (o.getData().results.personalizationData.variantName[l].name === o.getData().results.newVariantName) {
							this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/results/varinatNameValueState", "Error");
							s.error("New variant name cannot be same as the existing variant");
							return
						}
					}
					this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/results/varinatNameValueState", "None");
					var i = o.getData().results.newVariantName;
					for (var n = 0; n < this.selectedObjects.length; n++) {
						this.selectedObjects[n].variantId = i
					}
				} else {
					this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/results/varinatNameValueState", "Error");
					sap.m.MessageBox.error("Enter a Variant Name");
					return
				}
			}
			var d = this.getView().getModel("oUserModel").getData().userID;
			var h = this.getView().byId("ID_TAB_BAR_PROV_APP").getSelectedKey();
			var p;
			var c = {
				varaiantObject: this.selectedObjects,
				userId: d,
				applicationId: h,
				varaintId: this.selectedObjects[0].variantId
			};
			var g = "/DKSHJavaService/variant/UpdateVariant";
			var m = new sap.m.BusyDialog;
			m.open();
			this._doAjax(g, "PUT", c).then(e => {
				m.close();
				this.selectedObjects = [];
				o.setProperty("/results/selectVarVisible", true);
				o.setProperty("/results/nameVarVisible", false);
				o.setProperty("/results/enableCheckBox", false);
				o.setProperty("/results/savePersBtnVisible", false);
				o.setProperty("/results/okPersBtnVisible", true);
				t.FilterPersonalization.getModel("FilterPersonalization").refresh();
				t.FilterPersonalization.close();
				sap.m.MessageBox.success("Created Successfully!", {
					actions: [sap.m.MessageBox.Action.OK],
					onClose: function (e) {
						if (e === s.Action.OK) {
							t._getPersonalizationDetails(h)
						}
					}
				})
			}, e => {
				m.close();
				s.error(e.responseText);
				t.FilterPersonalization.close()
			})
		},
		onVariantDelete: function () {
			var e = this;
			var t = this.getView().getModel("oUserModel").getData().userID;
			var r = this.FilterPersonalization.getModel("FilterPersonalization").getProperty("/results/personalizationData/userPersonaDto");
			var a;
			var o = {
				varaiantObject: r,
				userId: t,
				// applicationId: this.selectedTab,
				applicationId: "keyMat.Movement.Ind",
				varaintId: this.FilterPersonalization.getModel("FilterPersonalization").getProperty("/results/personalizationData/userPersonaDto")[
					0].variantId
			};
			var l = "/DKSHJavaService/variant/deleteVariant";
			var i = new sap.m.BusyDialog;
			i.open();
			this._doAjax(l, "DELETE", o).then(t => {
				i.close();
				e.FilterPersonalization.close();
				sap.m.MessageBox.success(t.name, {
					actions: [sap.m.MessageBox.Action.OK],
					onClose: function (t) {
						if (t === s.Action.OK) {
							e._getPersonalizationDetails(e.selectedTab)
						}
					}
				})
			}, t => {
				e._getPersonalizationDetails(e.selectedTab);
				e.FilterPersonalization.close();
				i.close();
				s.error(t.responseText)
			})
		},

		_getPersonalizationDetails: function (e) {
			//	var t = this;
			var r = "Web";
			if (sap.ui.Device.system.phone === true) {
				r = "Phone"
			}
			var a = "/DKSHJavaService/variant/getVariant";
			var o = {
				userId: this.getView().getModel("oUserModel").getData().userID,
				appId: e,
				runType: r,
				emailId: this.getView().getModel("oUserModel").getData().email
			};
			var l = new sap.m.BusyDialog;
			l.open();
			this._doAjax(a, "POST", o, true).then(e => {
				l.close();
				if (e.userPersonaDto !== null) {
					this.getView().getModel("PersonalizationModel").setProperty("/personalizationData", e);
					this.getView().getModel("tabPersonalizationModel").setProperty("/personalizationData", e);
					this.getView().getModel("tabPersonalizationModel").refresh();
					this.getView().getModel("PersonalizationModel").refresh();
					this.getView().getModel("PersonalizationModel").setProperty("/okPersBtnVisible", true);
					this.getView().getModel("PersonalizationModel").setProperty("/savePersBtnVisible", false);
					this.getView().getModel("PersonalizationModel").setProperty("/cancelPersBtnVisible", true);
					this.getView().getModel("PersonalizationModel").setProperty("/deletePersBtnVisible", false);
					this.getView().getModel("PersonalizationModel").setProperty("/createPersBtnVisible", true);
					this.getView().getModel("PersonalizationModel").setProperty("/editPersBtnVisible", true);
					this.getView().getModel("PersonalizationModel").setProperty("/varinatNameValueState", "None");
					this.getView().getModel("PersonalizationModel").refresh()
				    // [+] START Modification: STRY0014745:MY Enhancements Defaulting mandatory fields -	JAYAMALARJ
					this._setDefaultPlant();
					this._setDefaultMatGrp();
					// [+] END Modification: STRY0014745:MY Enhancements Defaulting mandatory fields -	JAYAMALARJ
				}
			}, e => {
				l.close();
				s.error(e.responseText)
			})

			//this._setDefaultPlant();
			//this._setDefaultMatGrp();
		},
		onPressPersonalization: function (e) {
			var t = this;
			var s = this.getView().getModel("PersonalizationModel");
			if (!this.FilterPersonalization) {
				this.FilterPersonalization = sap.ui.xmlfragment("dksh.connectclient.InventoryMatManagement.Fragments.FilterPersonalization", this);
				this.getView().addDependent(this.FilterPersonalization)
			}
			var r = new sap.ui.model.json.JSONModel({
				results: this.getView().getModel("PersonalizationModel").getData()
			});
			this.FilterPersonalization.setModel(r, "FilterPersonalization");
			this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/results/enableCheckBox", false);
			this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/results/selectVarVisible", true);
			this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/results/nameVarVisible", false);
			this.FilterPersonalization.getModel("FilterPersonalization").refresh();
			this.FilterPersonalization.getModel("FilterPersonalization").refresh();
			this.FilterPersonalization.open()
		},
		onConfirmChangePlant: function (e) {
			this.getView().getModel("baseModel").getData().EndingStckplantValueState = "None";
			this.getView().getModel("baseModel").refresh();
			e.getSource().getBinding("items").filter([]);
			if (this.plantPlaceholder === "To") {
				if (this.plantFromSelectedItems.length === 0) {
					a.show("Add plant from");
					return
				}
				this.plantToSelectedItems = [];
				if (e.getParameters().selectedContexts.length > 0) {
					var t = this.byId(this._getId("PlantTo"));
					t.destroyTokens();
					if (e.getParameters().selectedContexts.length > 1) {
						a.show("Can select only one item")
					}
					this.plantToSelectedItems.push(e.getParameters().selectedContexts[0].getObject().plant);
					t.addToken(new l({
						text: this.plantToSelectedItems[0]
					}))
				} else {
					s.error("Select atleast one item")
				}
			} else {
				if (e.getParameters().selectedContexts.length > 0) {
					var t = this.byId(this._getId("PlantFrom"));
					// [+] start Jayamalar
					t.destroyTokens();
					this.plantFromSelectedItems = [];
					// [+] end Jayamalarñ
					if (this.plantFromSelectedItems.length === 0) {
						for (var r = 0; r < e.getParameters().selectedContexts.length; r++) {
							this.plantFromSelectedItems.push(e.getParameters().selectedContexts[r].getObject().plant);
							t.addToken(new l({
								text: e.getParameters().selectedContexts[r].getObject().plant
							}));
							//t.addToken(new sap.m.l({text: e.getParameters().selectedContexts[r].getObject().plant }));
						}
					} else {
						for (var r = 0; r < e.getParameters().selectedContexts.length; r++) {
							for (var o = 0; o < this.plantFromSelectedItems.length; o++) {
								if (this.plantFromSelectedItems.includes(e.getParameters().selectedContexts[r].getObject().plant) === false) {
									this.plantFromSelectedItems.push(e.getParameters().selectedContexts[r].getObject().plant);
									t.addToken(new l({
										text: e.getParameters().selectedContexts[r].getObject().plant
									}));
									//t.addToken(new sap.m.l({text: e.getParameters().selectedContexts[r].getObject().plant }));
								} else {}
							}
						}
					}
					if (this.plantFromSelectedItems.length === 1) {
						this.getView().getModel("baseModel").setProperty("/enablePlantTo", true);
						this.getView().getModel("baseModel").refresh()
					} else {
						this.getView().getModel("baseModel").setProperty("/enablePlantTo", false);
						this.getView().getModel("baseModel").refresh()
					}
				} else {
					s.error("Select atleast one item")
				}
			}
		},
		onDeleteEndStckPlant: function (e) {
			var t = e.getSource().getPlaceholder();
			if (t === "To") {
				var s = this.byId(this._getId("PlantTo"));
				s.destroyTokens();
				this.plantToSelectedItems.splice(0, 1)
			} else {
				if (e.getParameters().type === "removed") {
					var s = this.byId(this._getId("PlantFrom"));
					s.destroyTokens();
					this.plant = undefined;
					var r = e.getParameters().removedTokens[0].mProperties.text;
					for (var a = this.plantFromSelectedItems.length; a >= 0; a--) {
						if (r === this.plantFromSelectedItems[a]) {
							this.plantFromSelectedItems.splice(a, 1)
						}
					}
					if (this.plantFromSelectedItems.length > 0) {
						for (var o = 0; o < this.plantFromSelectedItems.length; o++) {
							s.addToken(new l({
								text: this.plantFromSelectedItems[o]
							}));
							if (this.plantFromSelectedItems.length <= 1) {
								this.getView().getModel("baseModel").setProperty("/enableSLocTo", true);
								this.getView().getModel("baseModel").refresh()
							} else {
								this.getView().getModel("baseModel").setProperty("/enableSLocTo", false);
								this.getView().getModel("baseModel").refresh()
							}
						}
					}
				} else {
					this.plantFromSelectedItems.push(e.getParameters().addedTokens[0].getText())
				}
			}
		},
		onConfirmChangeSalesOrg: function (e) {
			this.getView().getModel("baseModel").getData().SalesOrgValueState = "None";
			e.getSource().getBinding("items").filter([]);
			if (this.salesOrgPlaceholder === "To") {
				if (this.salesOrgFromSelectedItems.length === 0) {
					a.show("Add sales org from");
					return
				}
				this.salesOrgToSelectedItems = [];
				if (e.getParameters().selectedContexts.length > 0) {
					var t = this.byId(this._getId("SalesOrgTo"));
					t.destroyTokens();
					if (e.getParameters().selectedContexts.length > 1) {
						a.show("Can select only one item")
					}
					if (parseInt(this.salesOrgFromSelectedItems[0]) < parseInt(e.getParameters().selectedContexts[0].getObject().Salesorg)) {
						this.salesOrgToSelectedItems.push(e.getParameters().selectedContexts[0].getObject().Salesorg);
						t.addToken(new l({
							text: this.salesOrgToSelectedItems[0]
						}))
					} else {
						a.show("Select value greater than 'From' ")
					}
				} else {
					s.error("Select atleast one item")
				}
			} else {
				if (e.getParameters().selectedContexts.length > 0) {
					var t = this.byId(this._getId("SalesOrgFrom"));
					if (this.salesOrgFromSelectedItems.length === 0) {
						for (var r = 0; r < e.getParameters().selectedContexts.length; r++) {
							this.salesOrgFromSelectedItems.push(e.getParameters().selectedContexts[r].getObject().Salesorg);
							t.addToken(new l({
								text: e.getParameters().selectedContexts[r].getObject().Salesorg
							}))
						}
					} else {
						for (var r = 0; r < e.getParameters().selectedContexts.length; r++) {
							for (var o = 0; o < this.salesOrgFromSelectedItems.length; o++) {
								if (this.salesOrgFromSelectedItems.includes(e.getParameters().selectedContexts[r].getObject().Salesorg) === false) {
									this.salesOrgFromSelectedItems.push(e.getParameters().selectedContexts[r].getObject().Salesorg);
									t.addToken(new l({
										text: e.getParameters().selectedContexts[r].getObject().Salesorg
									}))
								} else {}
							}
						}
					}
					if (this.salesOrgFromSelectedItems.length <= 1) {
						this.getView().getModel("baseModel").setProperty("/enableSalesOrgTo", true);
						this.getView().getModel("baseModel").refresh()
					} else {
						this.getView().getModel("baseModel").setProperty("/enableSalesOrgTo", false);
						this.getView().getModel("baseModel").refresh()
					}
				} else {
					s.error("Select atleast one item")
				}
			}
		},
		onDeleteSalesOrg: function (e) {
			var t = e.getSource().getPlaceholder();
			if (t === "To") {
				this.salesOrgToSelectedItems = [];
				var s = this.byId(this._getId("SalesOrgTo"));
				s.destroyTokens();
				this.salesOrgToSelectedItems.splice(0, 1)
			} else {
				if (e.getParameters().type === "removed") {
					var s = this.byId(this._getId("SalesOrgFrom"));
					s.destroyTokens();
					var r = e.getParameters().removedTokens[0].mProperties.text;
					for (var a = this.salesOrgFromSelectedItems.length; a >= 0; a--) {
						if (r === this.salesOrgFromSelectedItems[a]) {
							this.salesOrgFromSelectedItems.splice(a, 1)
						}
					}
					if (this.salesOrgFromSelectedItems.length > 0) {
						for (var o = 0; o < this.salesOrgFromSelectedItems.length; o++) {
							s.addToken(new l({
								text: this.salesOrgFromSelectedItems[o]
							}));
							if (this.salesOrgFromSelectedItems.length <= 1) {
								this.getView().getModel("baseModel").setProperty("/enableSLocTo", true);
								this.getView().getModel("baseModel").refresh()
							} else {
								this.getView().getModel("baseModel").setProperty("/enableSLocTo", false);
								this.getView().getModel("baseModel").refresh()
							}
						}
					}
				} else {
					this.salesOrgFromSelectedItems.push(e.getParameters().addedTokens[0].getText())
				}
			}
		},
		onConfirmChangeStoLoc: function (e) {
			this.getView().getModel("baseModel").getData().EndingStckSLocValueState = "None";
			e.getSource().getBinding("items").filter([]);
			if (this.SLocPlaceholder === "To") {
				if (this.SLocFromSelectedItems.length === 0) {
					a.show("Add SLoc from");
					return
				}
				this.SLocToSelectedItems = [];
				if (e.getParameters().selectedContexts.length > 0) {
					var t = this.byId(this._getId("SLocTo"));
					t.destroyTokens();
					if (e.getParameters().selectedContexts.length > 1) {
						a.show("Can select only one item")
					}
					if (parseInt(this.SLocFromSelectedItems[0]) < parseInt(e.getParameters().selectedContexts[0].getObject().storageLocation)) {
						this.SLocToSelectedItems.push(e.getParameters().selectedContexts[0].getObject().storageLocation);
						t.addToken(new l({
							text: this.SLocToSelectedItems[0]
						}))
					} else {
						a.show("Select value greater than 'From' ")
					}
				} else {
					s.error("Select atleast one item")
				}
			} else {
				if (e.getParameters().selectedContexts.length > 0) {
					var t = this.byId(this._getId("SLocFrom"));
					if (this.SLocFromSelectedItems.length === 0) {
						for (var r = 0; r < e.getParameters().selectedContexts.length; r++) {
							this.SLocFromSelectedItems.push(e.getParameters().selectedContexts[r].getObject().storageLocation);
							t.addToken(new l({
								text: e.getParameters().selectedContexts[r].getObject().storageLocation
							}))
						}
					} else {
						for (var r = 0; r < e.getParameters().selectedContexts.length; r++) {
							for (var o = 0; o < this.SLocFromSelectedItems.length; o++) {
								if (this.SLocFromSelectedItems.includes(e.getParameters().selectedContexts[r].getObject().storageLocation) === false) {
									this.SLocFromSelectedItems.push(e.getParameters().selectedContexts[r].getObject().storageLocation);
									t.addToken(new l({
										text: e.getParameters().selectedContexts[r].getObject().storageLocation
									}))
								} else {}
							}
						}
					}
					if (this.SLocFromSelectedItems.length <= 1) {
						this.getView().getModel("baseModel").setProperty("/enableSLocTo", true);
						this.getView().getModel("baseModel").refresh()
					} else {
						this.getView().getModel("baseModel").setProperty("/enableSLocTo", false);
						this.getView().getModel("baseModel").refresh()
					}
				} else {
					s.error("Select atleast one item")
				}
			}
		},
		onDeleteStoLoc: function (e) {
			if (e.getSource().getPlaceholder() === "To") {
				var t = this.byId(this._getId("SLocTo"));
				t.destroyTokens();
				this.SLocToSelectedItems.splice(0, 1)
			} else {
				if (e.getParameters().type === "removed") {
					var t = this.byId(this._getId("SLocFrom"));
					t.destroyTokens();
					var s = e.getParameters().removedTokens[0].mProperties.text;
					for (var r = this.SLocFromSelectedItems.length; r >= 0; r--) {
						if (s === this.SLocFromSelectedItems[r]) {
							this.SLocFromSelectedItems.splice(r, 1)
						}
					}
					if (this.SLocFromSelectedItems.length > 0) {
						for (var a = 0; a < this.SLocFromSelectedItems.length; a++) {
							t.addToken(new l({
								text: this.SLocFromSelectedItems[a]
							}));
							if (this.SLocFromSelectedItems.length <= 1) {
								this.getView().getModel("baseModel").setProperty("/enableSLocTo", true);
								this.getView().getModel("baseModel").refresh()
							} else {
								this.getView().getModel("baseModel").setProperty("/enableSLocTo", false);
								this.getView().getModel("baseModel").refresh()
							}
						}
					}
				} else {
					this.SLocFromSelectedItems.push(e.getParameters().addedTokens[0].getText())
				}
			}
		},
		onConfirmChangeMatGrp: function (e) {
			this.getView().getModel("baseModel").getData().matGrpValueState = "None";
			e.getSource().getBinding("items").filter([]);
			if (this.matGrpPlaceholder === "To") {
				if (this.MatGrpFromSelectedItems.length === 0) {
					a.show("Add Mat Grp from");
					return
				}
				this.MatGrpToSelectedItems = [];
				if (e.getParameters().selectedContexts.length > 0) {
					var t = this.byId(this._getId("MatGrpTo"));
					t.destroyTokens();
					if (e.getParameters().selectedContexts.length > 1) {
						a.show("Can select only one item")
					}
					if (parseInt(this.MatGrpFromSelectedItems[0]) < parseInt(e.getParameters().selectedContexts[0].getObject().materialGroup)) {
						this.MatGrpToSelectedItems.push(e.getParameters().selectedContexts[0].getObject().materialGroup);
						t.addToken(new l({
							text: this.MatGrpToSelectedItems[0]
						}))
					} else {
						a.show("Select value greater than 'From' ")
					}
				} else {
					s.error("Select atleast one item")
				}
			} else {
				if (e.getParameters().selectedContexts.length > 0) {
					var t = this.byId(this._getId("MatGrpFrom"));
					// [+] START Modification: STRY0014745:MY Enhancements Defaulting mandatory fields -	JAYAMALARJ
					t.destroyTokens();
					this.MatGrpFromSelectedItems = [];
					this.MatGrpToSelectedItems = [];
					// [+] END Modification: STRY0014745:MY Enhancements Defaulting mandatory fields -	JAYAMALARJ
					if (this.MatGrpFromSelectedItems.length === 0) {
						for (var r = 0; r < e.getParameters().selectedContexts.length; r++) {
							this.MatGrpFromSelectedItems.push(e.getParameters().selectedContexts[r].getObject().materialGroup);
							t.addToken(new l({
								text: e.getParameters().selectedContexts[r].getObject().materialGroup
							}))
						}
					} else {
						for (var r = 0; r < e.getParameters().selectedContexts.length; r++) {
							for (var o = 0; o < this.MatGrpFromSelectedItems.length; o++) {
								if (this.MatGrpFromSelectedItems.includes(e.getParameters().selectedContexts[r].getObject().materialGroup) === false) {
									this.MatGrpFromSelectedItems.push(e.getParameters().selectedContexts[r].getObject().materialGroup);
									t.addToken(new l({
										text: e.getParameters().selectedContexts[r].getObject().materialGroup
									}))
								} else {}
							}
						}
					}
					if (this.MatGrpFromSelectedItems.length <= 1) {
						this.getView().getModel("baseModel").setProperty("/enablematGrpTo", true);
						this.getView().getModel("baseModel").refresh()
					} else {
						this.getView().getModel("baseModel").setProperty("/enablematGrpTo", false);
						this.getView().getModel("baseModel").refresh()
					}
				} else {
					s.error("Select atleast one item")
				}
			}
		},
		onDeleteMatGrp: function (e) {
			var t = e.getSource().getPlaceholder();
			if (t === "To") {
				var s = this.byId(this._getId("MatGrpTo"));
				s.destroyTokens();
				this.MatGrpToSelectedItems.splice(0, 1)
			} else {
				if (e.getParameters().type === "removed") {
					var s = this.byId(this._getId("MatGrpFrom"));
					s.destroyTokens();
					var r = e.getParameters().removedTokens[0].mProperties.text;
					for (var a = this.MatGrpFromSelectedItems.length; a >= 0; a--) {
						if (r === this.MatGrpFromSelectedItems[a]) {
							this.MatGrpFromSelectedItems.splice(a, 1)
						}
					}
					if (this.MatGrpFromSelectedItems.length > 0) {
						for (var o = 0; o < this.MatGrpFromSelectedItems.length; o++) {
							s.addToken(new l({
								text: this.MatGrpFromSelectedItems[o]
							}))
						}
						if (this.MatGrpFromSelectedItems.length <= 1) {
							this.getView().getModel("baseModel").setProperty("/enablematGrpTo", true);
							this.getView().getModel("baseModel").refresh()
						} else {
							this.getView().getModel("baseModel").setProperty("/enablematGrpTo", false);
							this.getView().getModel("baseModel").refresh()
						}
					}
				} else {
					this.MatGrpFromSelectedItems.push(e.getParameters().addedTokens[0].getText())
				}
			}
		},
		onConfirmChangeMatGrp4: function (e) {
			e.getSource().getBinding("items").filter([]);
			if (this.matGrp4Placeholder === "To") {
				if (this.MatGrp4FromSelectedItems.length === 0) {
					a.show("Add Mat Grp4 from");
					return
				}
				if (e.getParameters().selectedContexts.length > 0) {
					var t = this.byId(this._getId("MatGrp4To"));
					t.destroyTokens();
					if (e.getParameters().selectedContexts.length > 1) {
						a.show("Can select only one item")
					}
					this.MatGrp4ToSelectedItems.push(e.getParameters().selectedContexts[0].getObject().materialGroup4);
					t.addToken(new l({
						text: this.MatGrp4ToSelectedItems[0]
					}))
				} else {
					s.error("Select atleast one item")
				}
			} else {
				if (e.getParameters().selectedContexts.length > 0) {
					var t = this.byId(this._getId("MatGrp4From"));
					if (this.MatGrp4FromSelectedItems.length === 0) {
						for (var r = 0; r < e.getParameters().selectedContexts.length; r++) {
							this.MatGrp4FromSelectedItems.push(e.getParameters().selectedContexts[r].getObject().materialGroup4);
							t.addToken(new l({
								text: e.getParameters().selectedContexts[r].getObject().materialGroup4
							}))
						}
					} else {
						for (var r = 0; r < e.getParameters().selectedContexts.length; r++) {
							for (var o = 0; o < this.MatGrp4FromSelectedItems.length; o++) {
								if (this.MatGrp4FromSelectedItems.includes(e.getParameters().selectedContexts[r].getObject().materialGroup4) === false) {
									this.MatGrp4FromSelectedItems.push(e.getParameters().selectedContexts[r].getObject().materialGroup4);
									t.addToken(new l({
										text: e.getParameters().selectedContexts[r].getObject().materialGroup4
									}))
								} else {}
							}
						}
					}
					if (this.MatGrp4FromSelectedItems.length === 1) {
						this.getView().getModel("baseModel").setProperty("/enablematGrp4To", true);
						this.getView().getModel("baseModel").refresh()
					} else {
						this.getView().getModel("baseModel").setProperty("/enablematGrp4To", false);
						this.getView().getModel("baseModel").refresh()
					}
				} else {
					s.error("Select atleast one item")
				}
			}
		},
		onDeleteMatGrp4: function (e) {
			var t = e.getSource().getPlaceholder();
			if (t === "To") {
				var s = this.byId(this._getId("MatGrp4To"));
				s.destroyTokens();
				this.MatGrp4ToSelectedItems.splice(0, 1)
			} else {
				if (e.getParameters().type === "removed") {
					var s = this.byId(this._getId("MatGrp4From"));
					s.destroyTokens();
					var r = e.getParameters().removedTokens[0].mProperties.text;
					for (var a = this.MatGrp4FromSelectedItems.length; a >= 0; a--) {
						if (r === this.MatGrp4FromSelectedItems[a]) {
							this.MatGrp4FromSelectedItems.splice(a, 1)
						}
					}
					if (this.MatGrp4FromSelectedItems.length > 0) {
						for (var o = 0; o < this.MatGrp4FromSelectedItems.length; o++) {
							s.addToken(new l({
								text: this.MatGrp4FromSelectedItems[o]
							}))
						}
						if (this.MatGrp4FromSelectedItems.length === 1) {
							this.getView().getModel("baseModel").setProperty("/enablematGrp4To", true);
							this.getView().getModel("baseModel").refresh()
						} else {
							this.getView().getModel("baseModel").setProperty("/enablematGrp4To", false);
							this.getView().getModel("baseModel").refresh()
						}
					}
				} else {
					this.MatGrp4FromSelectedItems.push(e.getParameters().addedTokens[0].getText());
					if (this.MatGrp4FromSelectedItems.length === 1) {
						this.getView().getModel("baseModel").setProperty("/enablematGrp4To", true);
						this.getView().getModel("baseModel").refresh()
					} else {
						this.getView().getModel("baseModel").setProperty("/enablematGrp4To", false);
						this.getView().getModel("baseModel").refresh()
					}
				}
			}
		},
		onCancelValueHelp: function (e) {
			e.getSource().getBinding("items").filter([])
		},
		onMaterialFromChange: function (e) {
			if (e.getSource().getPlaceholder() === "To") {
				this.selectedMatToItems = [];
				var t = this.byId(this._getId("MaterialTo"));
				t.destroyTokens();
				if (parseInt(this.selectedMatFromItems[0]) < parseInt(e.getParameters().value)) {
					this.selectedMatToItems.push(e.getParameters().value);
					t.addToken(new l({
						text: this.selectedMatToItems[0]
					}))
				} else {
					a.show("Select a value greater than 'From'")
				}
				e.getSource().setValue("")
			} else {
				var t = this.byId(this._getId("MaterialFrom"));
				if (this.selectedMatFromItems.length === 0) {
					this.selectedMatFromItems.push(e.getParameters().value);
					t.addToken(new l({
						text: e.getParameters().value
					}))
				} else {
					if (this.selectedMatFromItems.includes(e.getParameters().value) === false) {
						this.selectedMatFromItems.push(e.getParameters().value);
						t.addToken(new l({
							text: e.getParameters().value
						}))
					}
				}
				if (this.selectedMatFromItems.length === 1) {
					this.getView().getModel("baseModel").setProperty("/enablematTo", true);
					this.getView().getModel("baseModel").refresh()
				} else {
					this.getView().getModel("baseModel").setProperty("/enablematTo", false);
					this.getView().getModel("baseModel").refresh()
				}
				e.getSource().setValue("")
			}
		},
		onMaterialFromDelete: function (e) {
			var t = e.getSource().getPlaceholder();
			if (t === "To") {
				var s = this.byId(this._getId("MaterialTo"));
				s.destroyTokens();
				this.selectedMatToItems.splice(0, 1)
			} else {
				var s = this.byId(this._getId("MaterialFrom"));
				s.destroyTokens();
				var r = e.getParameters().removedTokens[0].mProperties.text;
				for (var a = this.selectedMatFromItems.length; a >= 0; a--) {
					if (r === this.selectedMatFromItems[a]) {
						this.selectedMatFromItems.splice(a, 1)
					}
				}
				if (this.selectedMatFromItems.length > 0) {
					for (var o = 0; o < this.selectedMatFromItems.length; o++) {
						s.addToken(new l({
							text: this.selectedMatFromItems[o]
						}));
						if (this.selectedMatFromItems.length === 1) {
							this.getView().getModel("baseModel").setProperty("/enablematTo", true);
							this.getView().getModel("baseModel").refresh()
						} else {
							this.getView().getModel("baseModel").setProperty("/enablematTo", false);
							this.getView().getModel("baseModel").refresh()
						}
					}
				}
			}
		},
		onChangePostingDateFrom: function (e) {
			this.getView().getModel("baseModel").getData().postingDateValueStateFrom = "None";
			var t = e.getParameters().value;
			if (t === NaN || t === "") {
				t = ""
			}
			var s = this.formatter.dateTimeFormat(t);
			this.postingDateFrom = s
		},
		oncheckSelect: function (e) {
			var t = e.getSource().getSelected();
			if (t === true) {
				this.serialNo = "serialNo eq " + "'" + "X" + "'"
			} else {
				this.serialNo = undefined
			}
		},
		onChangePostingDateTo: function (e) {
			if (!this.postingDateFrom) {
				a.show("Add Posting Date from");
				return
			} else {
				this.getView().getModel("baseModel").getData().postingDateValueStateTo = "None";
				var t = e.getParameters().value;
				if (t === NaN || t === "") {
					t = ""
				}
				var s = this.formatter.dateTimeFormat(t);
				this.postingDateTo = s
			}
		},
		onChangeMonth: function (e) {
			var t = new Date(e.getParameters().value);
			if (t === NaN) {
				t = ""
			}
			if (t.getMonth().toString().length === 1 && t.getMonth() < 9) {
				var s = t.getFullYear().toString() + "0" + (t.getMonth() + 1)
			} else {
				var s = t.getFullYear().toString() + (t.getMonth() + 1)
			}
			this.spMonth = "spMonth eq" + "'" + s + "'"
		},
		onExptStkLot: function () {
			var e = this.getView().getModel("stockLotModel").getData().results;
			this.JSONToCSVConvertor1(e, "Stock And Lot Control List", true)
		},
		JSONToCSVConvertor1: function (e, t, s) {
			var r = [];
			var a = e;
			var o = "";
			var l = this;
			o += t + "\r\n";
			if (s) {
				var i = "";
				i = i.slice(0, -1);
				o += i + "\r\n"
			}
			var n = this.getView().getModel("PersonalizationModel").getProperty("/personalizationData/userPersonaDto");
			for (var d = 0; d < a.length; d++) {
				var h = "";
				var i = "";
				for (var p = 0; p < n.length; p++) {
					if (n[p].status === true) {
						if (n[p].enabledKey === "Material") {
							h = h + '"' + "Material Num" + '","' + "Material Desc" + '","'
						} else if (n[p].enabledKey === "Vendor Mat.") {
							h = h + "Vendor Mat Num" + '","'
						} else if (n[p].enabledKey === "LTP / Price") {
							h = h + "LTP/Price" + '","'
						} else if (n[p].enabledKey === "On Hand") {
							h = h + "On Hand" + '","'
						} else if (n[p].enabledKey === "On Order") {
							h = h + "On Order" + '","'
						} else if (n[p].enabledKey === "Available") {
							h = h + "Available" + '","'
						} else if (n[p].enabledKey === "UNR") {
							h = h + "UNR" + '","' + "Sales UOM" + '","';
							a[d].salesUOM + '","'
						} else if (n[p].enabledKey === "Block Stock") {
							h = h + "Block Stock" + '","'
						} else if (n[p].enabledKey === "QI Stock") {
							h = h + "QI Stock" + '","'
						} else if (n[p].enabledKey === "Principal") {
							h = h + "Principal" + '","'
						} else if (n[p].enabledKey === "Material Group4") {
							h = h + "Material Group4" + '","'
						}
						if (p === n.length - 1) {}
					}
				}
				h = h.slice(0, h.length - 3);
				h = h + '",';
				o += h + "\r\n";
				var i = "";
				for (var p = 0; p < n.length; p++) {
					if (n[p].status === true) {
						if (n[p].enabledKey === "Material") {
							i = i + '"' + a[d].materialNum + '","' + a[d].materialDesc + '","'
						} else if (n[p].enabledKey === "Vendor Mat.") {
							i = i + a[d].vendorMatNum + '","'
						} else if (n[p].enabledKey === "LTP / Price") {
							i = i + parseFloat(a[d].ltp) + '","'
						} else if (n[p].enabledKey === "On Hand") {
							i = i + parseFloat(a[d].onHandQty) + '","'
						} else if (n[p].enabledKey === "On Order") {
							i = i + parseFloat(a[d].onOrderQty) + '","'
						} else if (n[p].enabledKey === "Available") {
							i = i + parseFloat(a[d].availQty) + '","'
						} else if (n[p].enabledKey === "UNR") {
							i = i + parseFloat(a[d].unrestrictedStock) + '","' + a[d].salesUOM + '","'
						} else if (n[p].enabledKey === "Block Stock") {
							i = i + a[d].blockedStock + '","'
						} else if (n[p].enabledKey === "QI Stock") {
							i = i + parseFloat(a[d].stockInspection) + '","'
						} else if (n[p].enabledKey === "Principal") {
							i = i + a[d].principalMatGroup + '","'
						} else if (n[p].enabledKey === "Material Group4") {
							i = i + a[d].materialGroup4 + '","'
						}
						if (p === n.length - 1) {}
					}
				}
				i = i.slice(0, i.length - 1);
				o += i + "\r\n";
				var c = "";
				for (var p = 0; p < n.length; p++) {
					if (n[p].status === true) {
						if (n[p].enabledKey === "Batch – Batch") {
							c = c + '"' + "Batch Num" + '","'
						} else if (n[p].enabledKey === "Batch – Recv. Date") {
							c = c + "Recv. Date" + '","'
						} else if (n[p].enabledKey === "Batch – Manu. Date") {
							c = c + "Manuf. Date" + '","'
						} else if (n[p].enabledKey === "Batch – Exp. Date") {
							c = c + "Exp. Date" + '","'
						} else if (n[p].enabledKey === "Batch – QTY") {
							c = c + "QTY" + '","'
						} else if (n[p].enabledKey === "Batch – SLOC") {
							c = c + "Storage Location" + '","'
						} else if (n[p].enabledKey === "Batch – Reserved By") {
							c = c + "Reserved By" + '","'
						} else if (n[p].enabledKey === "Batch –Unrest") {
							c = c + "Unrest" + '","'
						} else if (n[p].enabledKey === "Batch – Blocked") {
							c = c + "Blocked" + '","'
						} else if (n[p].enabledKey === "Batch – QI") {
							c = c + "QI" + '","'
						} else if (n[p].enabledKey === "Serial No.") {
							c = c + "Serial No" + '","'
						}
					}
				}
				c = c.slice(0, c.length - 3);
				c = c + '",';
				o += c + "\r\n";
				for (var g = 0; g < a[d].OutputToBatchOutput.results.length; g++) {
					var m = l.formatter.convertToDateToDispFormat(a[d].OutputToBatchOutput.results[g].createdOn);
					var u = l.formatter.convertToDateToDispFormatManuf(a[d].OutputToBatchOutput.results[g].manufDate);
					var M = l.formatter.convertToDateToDispFormatExp(a[d].OutputToBatchOutput.results[g].shelfLifeDate);
					if (u === undefined) {
						u = ""
					}
					var f = "";
					for (var p = 0; p < n.length; p++) {
						if (n[p].status === true) {
							if (n[p].enabledKey === "Batch – Batch") {
								f = f + '"' + a[d].OutputToBatchOutput.results[g].batchNum + '","'
							} else if (n[p].enabledKey === "Batch – Recv. Date") {
								f = f + m + '","'
							} else if (n[p].enabledKey === "Batch – Manu. Date") {
								f = f + u + '","'
							} else if (n[p].enabledKey === "Batch – Exp. Date") {
								f = f + M + '","'
							} else if (n[p].enabledKey === "Batch – QTY") {
								f = f + parseFloat(a[d].OutputToBatchOutput.results[g].qtyUnrestrictedStock) + '","'
							} else if (n[p].enabledKey === "Batch – SLOC") {
								f = f + a[d].OutputToBatchOutput.results[g].storageLocation + '","'
							} else if (n[p].enabledKey === "Batch – Reserved By") {
								f = f + a[d].OutputToBatchOutput.results[g].reservedby + '","'
							} else if (n[p].enabledKey === "Batch –Unrest") {
								f = f + parseFloat(a[d].OutputToBatchOutput.results[g].batchQty) + '","'
							} else if (n[p].enabledKey === "Batch – Blocked") {
								f = f + parseFloat(a[d].OutputToBatchOutput.results[g].blockStock) + '","'
							} else if (n[p].enabledKey === "Batch – QI") {
								f = f + parseFloat(a[d].OutputToBatchOutput.results[g].stockInspection) + '","'
							} else if (n[p].enabledKey === "Serial No.") {
								f = f + a[d].OutputToBatchOutput.results[g].serialNum + '","'
							}
							if (p === n.length - 1) {}
						}
					}
					f = f.slice(0, f.length - 1);
					o += f + "\r\n"
				}
				o += "\r\n"
			}
			if (o === "") {
				sap.m.MessageToast.show("Invaild data");
				return
			}
			var S = "";
			S += t.replace(/ /g, "_");
			var v = "data:text/csv;charset=utf-8," + escape(o);
			var y = document.createElement("a");
			y.href = v;
			y.style = "visibility:hidden";
			y.download = S + ".csv";
			document.body.appendChild(y);
			y.click();
			document.body.removeChild(y)
		},
		onChangeMatDoc: function (e) {
			var t = this.byId(this._getId("MatDoc"));
			if (this.selectedMatDocItems.length === 0) {
				this.selectedMatDocItems.push(e.getParameters().value);
				t.addToken(new l({
					text: e.getParameters().value
				}))
			} else {
				if (this.selectedMatDocItems.includes(e.getParameters().value) === false) {
					this.selectedMatDocItems.push(e.getParameters().value);
					t.addToken(new l({
						text: e.getParameters().value
					}))
				}
			}
			e.getSource().setValue("")
		},
		onDeleteMatDoc: function (e) {
			var t = this.byId(this._getId("MatDoc"));
			t.destroyTokens();
			var s = e.getParameters().removedTokens[0].mProperties.text;
			if (e.getParameters().type === "removed") {
				for (var r = this.selectedMatDocItems.length; r >= 0; r--) {
					if (s === this.selectedMatDocItems[r]) {
						this.selectedMatDocItems.splice(r, 1)
					}
				}
				if (this.selectedMatDocItems.length > 0) {
					for (var a = 0; a < this.selectedMatDocItems.length; a++) {
						t.addToken(new l({
							text: this.selectedMatDocItems[a]
						}))
					}
				}
			} else {
				this.selectedMatDocItems.push(e.getParameters().addedTokens[0].getText())
			}
		},
		onChangeBatch: function (e) {
			var t = this.byId(this._getId("BatchFrom"));
			if (this.selectedBatch.length === 0) {
				this.selectedBatch.push(e.getParameters().value);
				t.addToken(new l({
					text: e.getParameters().value
				}))
			} else {
				if (this.selectedBatch.includes(e.getParameters().value) === false) {
					this.selectedBatch.push(e.getParameters().value);
					t.addToken(new l({
						text: e.getParameters().value
					}))
				}
			}
			e.getSource().setValue("")
		},
		onDeleteBatch: function (e) {
			var t = this.byId(this._getId("MaterialFrom"));
			t.destroyTokens();
			var s = e.getParameters().removedTokens[0].mProperties.text;
			if (e.getParameters().type === "removed") {
				for (var r = this.selectedBatch.length; r >= 0; r--) {
					if (s === this.selectedBatch[r]) {
						this.selectedBatch.splice(r, 1)
					}
				}
				if (this.selectedBatch.length > 0) {
					for (var a = 0; a < this.selectedBatch.length; a++) {
						t.addToken(new l({
							text: this.selectedBatch[a]
						}))
					}
				}
			} else {
				this.selectedBatch.push(e.getParameters().addedTokens[0].getText())
			}
		},
		onChangeVenMatFrom: function (e) {
			if (e.getSource().getPlaceholder() === "To") {
				if (this.selectedVendorMatFrom.length === 0) {
					a.show("Add vendor mat from");
					return
				}
				this.selectedVendorMatTo = [];
				var t = this.byId(this._getId("VendorMatTo"));
				t.destroyTokens();
				if (parseInt(this.selectedVendorMatFrom[0]) < parseInt(e.getParameters().value)) {
					this.selectedVendorMatTo.push(e.getParameters().value);
					t.addToken(new l({
						text: this.selectedVendorMatTo[0]
					}))
				} else {
					a.show("Select a value greater than 'From'")
				}
				e.getSource().setValue("")
			} else {
				var t = this.byId(this._getId("VendorMatFrom"));
				if (this.selectedVendorMatFrom.length === 0) {
					this.selectedVendorMatFrom.push(e.getParameters().value);
					t.addToken(new l({
						text: e.getParameters().value
					}))
				} else {
					if (this.selectedVendorMatFrom.includes(e.getParameters().value) === false) {
						this.selectedVendorMatFrom.push(e.getParameters().value);
						t.addToken(new l({
							text: e.getParameters().value
						}))
					}
				}
				if (this.selectedVendorMatFrom.length === 1) {
					this.getView().getModel("baseModel").setProperty("/enableVendorMat", true);
					this.getView().getModel("baseModel").refresh()
				} else {
					this.getView().getModel("baseModel").setProperty("/enableVendorMat", false);
					this.getView().getModel("baseModel").refresh()
				}
				e.getSource().setValue("")
			}
		},
		onDeleteVenMat: function (e) {
			var t = e.getSource().getPlaceholder();
			if (t === "To") {
				var s = this.byId(this._getId("VendorMatTo"));
				s.destroyTokens();
				this.selectedVendorMatTo.splice(0, 1)
			} else {
				if (e.getParameters().type === "removed") {
					var s = this.byId(this._getId("VendorMatFrom"));
					s.destroyTokens();
					var r = e.getParameters().removedTokens[0].mProperties.text;
					for (var a = this.selectedVendorMatFrom.length; a >= 0; a--) {
						if (r === this.selectedVendorMatFrom[a]) {
							this.selectedVendorMatFrom.splice(a, 1)
						}
					}
					if (this.selectedVendorMatFrom.length > 0) {
						for (var o = 0; o < this.selectedVendorMatFrom.length; o++) {
							s.addToken(new l({
								text: this.selectedVendorMatFrom[o]
							}));
							if (this.selectedVendorMatFrom.length === 1) {
								this.getView().getModel("baseModel").setProperty("/enableVendorMat", true);
								this.getView().getModel("baseModel").refresh()
							} else {
								this.getView().getModel("baseModel").setProperty("/enableVendorMat", false);
								this.getView().getModel("baseModel").refresh()
							}
						}
					}
				} else {
					this.selectedVendorMatFrom.push(e.getParameters().addedTokens[0].getText())
				}
			}
		},
		onChangeMatMov: function (e) {
			var t = this.byId(this._getId("matMov"));
			if (this.selectedMovType === undefined || this.selectedMovType.length === 0) {
				this.selectedMovType = [];
				this.selectedMovType.push(e.getParameters().value);
				t.addToken(new l({
					text: e.getParameters().value
				}))
			} else {
				if (this.selectedMovType.includes(e.getParameters().value) === false) {
					this.selectedMovType.push(e.getParameters().value);
					t.addToken(new l({
						text: e.getParameters().value
					}))
				}
			}
			e.getSource().setValue("")
		},
		onDeleteMatMov: function (e) {
			var t = this.byId(this._getId("matMov"));
			t.destroyTokens();
			var s = e.getParameters().removedTokens[0].mProperties.text;
			if (e.getParameters().type === "removed") {
				for (var r = this.selectedMovType.length; r >= 0; r--) {
					if (s === this.selectedMovType[r]) {
						this.selectedMovType.splice(r, 1)
					}
				}
				if (this.selectedMovType.length > 0) {
					for (var a = 0; a < this.selectedMovType.length; a++) {
						t.addToken(new l({
							text: this.selectedMovType[a]
						}))
					}
				}
			} else {
				this.selectedMovType.push(e.getParameters().addedTokens[0].getText())
			}
		},
		onChangeVenConsMat: function (e) {
			var t = e.getSource().getSelected();
			if (t === true) {
				this.venConsMaterial = "venConsMaterial eq " + "'X'";
				this.ownStkMaterial = undefined;
				this.allMaterials = undefined
			} else {
				this.venConsMaterial = undefined
			}
		},
		onChangeOwnStkMat: function (e) {
			var t = e.getSource().getSelected();
			if (t === true) {
				this.ownStkMaterial = "ownStkMaterial eq " + "'X'";
				this.venConsMaterial = undefined;
				this.allMaterials = undefined
			} else {
				this.ownStkMaterial = undefined
			}
		},
		onChangeAllMat: function (e) {
			var t = e.getSource().getSelected();
			if (t === true) {
				this.allMaterials = "allMaterials eq " + "'X'";
				this.ownStkMaterial = undefined;
				this.venConsMaterial = undefined
			} else {
				this.allMaterials = undefined
			}
		},
		onChangeEndingPer: function (e) {
			var t = e.getSource().getSelected();
			if (t === true) {
				this.byEndingPeriod = "byEndingPeriod eq " + "'X'";
				this.byAsAtDate = undefined;
				this.getView().getModel("baseModel").setProperty("/endingStockDateFrom", "")
			} else {
				this.byEndingPeriod = undefined
			}
		},
		onChangeAsDate: function (e) {
			var t = e.getSource().getSelected();
			if (t === true) {
				this.byAsAtDate = "byAsAtDate eq " + "'X'";
				this.byEndingPeriod = undefined;
				this.getView().getModel("baseModel").setProperty("/month", "")
			} else {
				this.byAsAtDate = undefined
			}
		},
		onChangeExcFDAStck: function (e) {
			var t = e.getSource().getSelected();
			if (t === true) {
				this.exFdaStock = "exFdaStock eq " + "'X'"
			} else {
				this.exFdaStock = undefined
			}
		},
		onChangeFromDate: function (e) {
			var t = e.getParameters().value;
			if (t === NaN || t === "") {
				t = ""
			}
			var s = this.formatter.dateTimeFormat(t);
			if (t) {
				this.endingStckDateFrom = "currentDate eq datetime" + "'" + s + "'"
			}
		},
		onChangeToDate: function (e) {
			if (!this.endingStckDateFrom) {
				a.show("Add from date");
				return
			}
			var t = e.getParameters().value;
			if (t === NaN) {
				t = ""
			}
			this.endingStckDateTo = "currentDate eq" + "'" + t + "'"
		},
		onChangeSalesUnit: function (e) {
			var t = e.getParameters().selected;
			if (t === true) {
				this.salesUnit = "salesUnit eq " + "'X'";
				this.baseUnit = undefined
			} else {
				this.salesUnit = undefined
			}
		},
		onChangeBaseUnit: function (e) {
			var t = e.getParameters().selected;
			if (t === true) {
				this.baseUnit = "baseUnit eq " + "'X'";
				this.salesUnit = undefined
			} else {
				this.baseUnit = undefined
			}
		},
		onChangeUnrestricted: function (e) {
			var t = e.getParameters().selected;
			if (t === true) {
				this.Unrestricted = "unrestricted eq " + "'X'"
			} else {
				this.Unrestricted = undefined
			}
		},
		onChangeInspection: function (e) {
			var t = e.getParameters().selected;
			if (t === true) {
				this.inspection = "qtyInspection eq " + "'X'"
			} else {
				this.inspection = undefined
			}
		},
		onChangeBlocked: function (e) {
			var t = e.getParameters().selected;
			if (t === true) {
				this.blocked = "block eq " + "'X'"
			} else {
				this.blocked = undefined
			}
		},
		onChangeBatchLevel: function (e) {
			var t = e.getParameters().selected;
			if (t === true) {
				this.BatchLevel = "batchLevel eq " + "'X'"
			} else {
				this.SlocLevel = undefined
			}
		},
		onChangeSLocLevel: function (e) {
			var t = e.getParameters().selected;
			if (t === true) {
				this.SlocLevel = "storageLocLevel eq " + "'X'"
			} else {
				this.BatchLevel = undefined
			}
		},
		_getId: function (e, t) {
			if (t !== undefined) {
				var s = t
			} else {
				// var s = this.selectedTab
				var s = "keyMat.Movement.Ind"
			}
			if (s === "keyATPOverviewEnquiry") {
				if (e === "SalesOrgTo") {
					return "ATPSalesOrgFromID"
				}
				if (e === "SLocFrom") {
					return "ATPSLocFromId"
				}
				if (e === "SLocTo") {
					return "ATPSLocToId"
				}
				if (e === "SalesOrgFrom") {
					return "ATPSalesOrgFromID"
				}
				if (e === "MatGrpFrom") {
					return "ATPMatGrpFromId"
				}
				if (e === "MatGrpTo") {
					return "ATPMatGrpToId"
				}
				if (e === "MatGrp4From") {
					return "ATPMatGrp4FromId"
				}
				if (e === "MatGrp4To") {
					return "ATPMatGrp4ToId"
				}
				if (e === "MaterialFrom") {
					return "ATPMatFromId"
				}
				if (e === "MaterialTo") {
					return "ATPMatToId"
				}
				if (e === "VendorMatFrom") {
					return "ATPVenMatFromId"
				}
				if (e === "VendorMatTo") {
					return "ATPVenMatToId"
				}
			}
			if (s === "keyEndingStockView") {
				if (e === "PlantFrom") {
					return "EndStckPlantFromId"
				}
				if (e === "SLocFrom") {
					return "EndStckSLocFromId"
				}
				if (e === "SLocTo") {
					return "EndStckSLocToId"
				}
				if (e === "MatGrpFrom") {
					return "EndStckMatGrpFromId"
				}
				if (e === "MatGrpTo") {
					return "EndStckMatGrpToId"
				}
				if (e === "MatGrp4From") {
					return "EndStckMatGrp4FromId"
				}
				if (e === "MatGrp4To") {
					return "EndStckMatGrp4ToId"
				}
				if (e === "MaterialFrom") {
					return "EndStckMatFromId"
				}
				if (e === "MaterialTo") {
					return "EndStckMatToId"
				}
				if (e === "VendorMatFrom") {
					return "EndStckVenMatFromId"
				}
				if (e === "VendorMatTo") {
					return "EndStckVenMatToId"
				}
			}
			if (s === "keyExpiryStockView") {
				if (e === "PlantFrom") {
					return "ExpStckPlantFromId"
				}
				if (e === "SLocFrom") {
					return "ExpStckSLocFromId"
				}
				if (e === "SLocTo") {
					return "ExpStckSLocToId"
				}
				if (e === "MatGrpFrom") {
					return "ExpStckMatGrpFromId"
				}
				if (e === "MatGrpTo") {
					return "ExpStckMatGrpToId"
				}
				if (e === "MatGrp4From") {
					return "ExpStckMatGrp4FromId"
				}
				if (e === "MatGrp4To") {
					return "ExpStckMatGrp4ToId"
				}
				if (e === "MaterialFrom") {
					return "ExpStckMatFromId"
				}
				if (e === "MaterialTo") {
					return "ExpStckMatToId"
				}
				if (e === "VendorMatFrom") {
					return "ExpStckVenMatFromId"
				}
				if (e === "VendorMatTo") {
					return "ExpStckVenMatToId"
				}
			}
			if (s === "keyMat.Movement.Ind") {
				if (e === "PlantFrom") {
					return "MatMovPlantFromId"
				}
				if (e === "SLocFrom") {
					return "MatMovSLocFromId"
				}
				if (e === "MatGrpFrom") {
					return "MatMovMatGrpFromId"
				}
				if (e === "MatGrp4From") {
					return "MatMovMatGrp4FromId"
				}
				if (e === "MaterialFrom") {
					return "MatMovMatFromId"
				}
				if (e === "BatchFrom") {
					return "MatMovBatchFromId"
				}
				if (e === "VendorMatFrom") {
					return "MatMovVenMatFromId"
				}
				if (e === "VendorMatTo") {
					return "MatMovVenMatToId"
				}
				if (e === "MatDoc") {
					return "MatMovMatDocFromId"
				}
				if (e = "matMov") {
					return "matMov"
				}
			}
			if (s === "keyStkLotView") {
				if (e === "PlantFrom") {
					return "StockLotPlantFromId"
				}
				if (e === "PlantTo") {
					return "StockLotPlantToId"
				}
				if (e === "SLocTo") {
					return "StockLotSlocToId"
				}
				if (e === "SLocFrom") {
					return "StockLotSlocFromId"
				}
				if (e === "MatGrpFrom") {
					return "StockLotMatGrpFromId"
				}
				if (e === "MatGrpTo") {
					return "StockLotMatGrpToId"
				}
				if (e === "BatchFrom") {
					return "stockLotBatchFromId"
				}
				if (e === "SalesOrgFrom") {
					return "StkLotSalesOrgFromID"
				}
				if (e === "SalesOrgTo") {
					return "StkLotSalesOrgToID"
				}
				if (e === "MatGrp4From") {
					return "StkLotMatGrp4FromId"
				}
				if (e === "MatGrp4To") {
					return "StkLotMatGrp4ToId"
				}
				if (e === "MaterialFrom") {
					return "StkLotMatFromId"
				}
				if (e === "MaterialTo") {
					return "StkLotMatToId"
				}
				if (e === "VendorMatFrom") {
					return "StkLotVenMatFromId"
				}
				if (e === "VendorMatTo") {
					return "StkLotVenMatToId"
				}
			}
		},
		onLiveChangeMatGrp: function (e) {
			var t = e.getParameters().value;
			var s = new Array;
			var r = new sap.ui.model.Filter([new sap.ui.model.Filter("materialGroupDesc", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model
				.Filter("materialGroup", sap.ui.model.FilterOperator.Contains, t)
			]);
			s.push(r);
			var a = e.getSource().getBinding("items");
			a.filter(s)
		},
		onLiveChangeMatGrp4: function (e) {
			var t = e.getParameters().value;
			var s = new Array;
			var r = new sap.ui.model.Filter([new sap.ui.model.Filter("materialGroup4Desc", sap.ui.model.FilterOperator.Contains, t), new sap.ui
				.model.Filter("materialGroup4", sap.ui.model.FilterOperator.Contains, t)
			]);
			s.push(r);
			var a = e.getSource().getBinding("items");
			a.filter(s)
		},
		onLiveChangePlant: function (e) {
			var t = e.getParameters().value;
			var s = new Array;
			var r = new sap.ui.model.Filter([new sap.ui.model.Filter("plantName", sap.ui.model.FilterOperator.Contains, t),
				new sap.ui.model.Filter("plant", sap.ui.model.FilterOperator.Contains, t)
			]);
			s.push(r);
			var a = e.getSource().getBinding("items");
			a.filter(s)
		},
		onLiveChangeSalesOrg: function (e) {
			var t = e.getParameters().value;
			var s = new Array;
			var r = new sap.ui.model.Filter([new sap.ui.model.Filter("Salesorg", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter(
				"SalesorgDesc", sap.ui.model.FilterOperator.Contains, t)]);
			s.push(r);
			var a = e.getSource().getBinding("items");
			a.filter(s)
		},
		onLiveChangeStoLoc: function (e) {
			var t = e.getParameters().value;
			var s = new Array;
			var r = new sap.ui.model.Filter([new sap.ui.model.Filter("storagelocationDesc", sap.ui.model.FilterOperator.Contains, t), new sap.ui
				.model.Filter("storageLocation", sap.ui.model.FilterOperator.Contains, t)
			]);
			s.push(r);
			var a = e.getSource().getBinding("items");
			a.filter(s)
		},
		clearTabData: function () {
			var e = this.byId(this._getId("PlantFrom"));
			if (e !== undefined) {
				e.destroyTokens()
			}
			var e = this.byId(this._getId("SLocFrom"));
			if (e !== undefined) {
				e.destroyTokens()
			}
			var e = this.byId(this._getId("SLocTo"));
			if (e !== undefined) {
				e.destroyTokens()
			}
			var e = this.byId(this._getId("MaterialFrom"));
			if (e !== undefined) {
				e.destroyTokens()
			}
			var e = this.byId(this._getId("MaterialTo"));
			if (e !== undefined) {
				e.destroyTokens()
			}
			var e = this.byId(this._getId("MatGrp4From"));
			if (e !== undefined) {
				e.destroyTokens()
			}
			var e = this.byId(this._getId("MatGrp4To"));
			if (e !== undefined) {
				e.destroyTokens()
			}
			var e = this.byId(this._getId("MatGrpFrom"));
			if (e !== undefined) {
				e.destroyTokens()
			}
			var e = this.byId(this._getId("MatGrpTo"));
			if (e !== undefined) {
				e.destroyTokens()
			}
			var e = this.byId(this._getId("SalesOrgFrom"));
			if (e !== undefined) {
				e.destroyTokens()
			}
			var e = this.byId(this._getId("BatchFrom"));
			if (e !== undefined) {
				e.destroyTokens()
			}
			var e = this.byId(this._getId("VendorMatFrom"));
			if (e !== undefined) {
				e.destroyTokens()
			}
			var e = this.byId(this._getId("VendorMatTo"));
			if (e !== undefined) {
				e.destroyTokens()
			}
			var e = this.byId(this._getId("MatDoc"));
			if (e !== undefined) {
				e.destroyTokens()
			}
			var e = this.byId(this._getId("matMov"));
			if (e !== undefined) {
				e.destroyTokens()
			}
			this.expiryDateFrom = undefined;
			this.expiryDateTo = undefined;
			this.selectedMovType = undefined;
			this.expiryDate = undefined;
			this.Unrestricted = undefined;
			this.BatchNum = undefined;
			this.RawMat = undefined;
			this.showQty = undefined;
			this.SalesMat = undefined;
			this.ZeroStk = undefined;
			this.onlyChBufferStk = undefined;
			this.onlyShowSalesUQ = undefined;
			this.onlyQI = undefined;
			this.onlyShowAllStk = undefined;
			this.serialNo = undefined;
			this.serialNo = undefined;
			this.BatchLevel = undefined;
			this.SlocLevel = undefined;
			this.Unrestricted = undefined;
			this.inspection = undefined;
			this.blocked = undefined;
			this.salesUnit = undefined;
			this.baseUnit = undefined;
			this.exFdaStock = undefined;
			this.endingStckDateFrom = undefined;
			this.spMonth = undefined;
			this.venConsMaterial = undefined;
			this.ownStkMaterial = undefined;
			this.allMaterials = undefined;
			this.byEndingPeriod = undefined;
			this.postingDateFrom = undefined;
			this.postingDateTo = undefined;
			this.spMonth = undefined;
			this.selectedObjects = [];
			this.selectedMatFromItems = [];
			this.selectedMatToItems = [];
			this.SLocToSelectedItems = [];
			this.SLocFromSelectedItems = [];
			this.plantFromSelectedItems = [];
			this.MatGrpFromSelectedItems = [];
			this.MatGrpToSelectedItems = [];
			this.MatGrp4FromSelectedItems = [];
			this.MatGrp4ToSelectedItems = [];
			this.selectedMatDocItems = [];
			this.selectedBatch = [];
			this.selectedVendorMat = [];
			this.selectedSalesOrg = [];
			this.selectedBatchStkLot = [];
			this.salesOrgFromSelectedItems = [];
			this.selectedSalesOrg = [];
			this.plantToSelectedItems = [];
			this.selectedVendorMatFrom = [];
			this.selectedVendorMatTo = [];
			this.selectedVendorMatFrom = [];
			this.selectedVendorMatTo = [];
			if (this._oPopover) {
				this._oPopover = undefined
			}
			if (this.getView().getModel("endingStckTableModel")) {
				this.getView().getModel("endingStckTableModel").setData("");
				if (this.getView().getModel("endingStckPopoverModel")) {
					this.getView().getModel("endingStckPopoverModel").setData("");
					this.getView().getModel("endingStckPopoverModel").refresh()
				}
				this.getView().getModel("endingStckTableModel").refresh()
			}
			if (this.getView().getModel("expiryStckTableModel")) {
				this.getView().getModel("expiryStckTableModel").setData("");
				if (this.getView().getModel("expiryStckPopoverModel")) {
					this.getView().getModel("expiryStckPopoverModel").setData("");
					this.getView().getModel("expiryStckPopoverModel").refresh();
					this._oPopover = undefined
				}
				this.getView().getModel("expiryStckTableModel").refresh()
			}
			if (this.getView().getModel("mavMovTableModel")) {
				this.getView().getModel("mavMovTableModel").setData("");
				if (this.getView().getModel("matMovPopoverModel")) {
					this.getView().getModel("matMovPopoverModel").setData("");
					this.getView().getModel("matMovPopoverModel").refresh();
					this._oPopover = undefined
				}
				this.getView().getModel("mavMovTableModel").refresh()
			}
			if (this.getView().getModel("ATPOverviewTableModel")) {
				this.getView().getModel("ATPOverviewTableModel").setData("");
				if (this.getView().getModel("ATPPopoverModel")) {
					this.getView().getModel("ATPPopoverModel").setData("");
					this.getView().getModel("ATPPopoverModel").refresh();
					this._oPopover = undefined
				}
				this.getView().getModel("ATPOverviewTableModel").refresh()
			}
			if (this.getView().getModel("stockLotModel")) {
				this.getView().getModel("stockLotModel").setData("");
				if (this.getView().getModel("StkLotPopoverModel")) {
					this.getView().getModel("StkLotPopoverModel").setData("");
					this.getView().getModel("StkLotPopoverModel").refresh();
					this._oPopover = undefined
				}
				this.getView().getModel("stockLotModel").refresh()
			}
			this.getView().getModel("endingStckTableModel");
			this.getView().getModel("PersonalizationModel").setProperty("/selectVarVisible", true);
			this.getView().getModel("PersonalizationModel").setProperty("/nameVarVisible", false);
			this.getView().getModel("PersonalizationModel").setProperty("/enableCheckBox", false);
			this.getView().getModel("PersonalizationModel").setProperty("/okPersBtnVisible", true);
			this.getView().getModel("PersonalizationModel").setProperty("/savePersBtnVisible", false);
			this.getView().getModel("PersonalizationModel").setProperty("/cancelPersBtnVisible", true);
			this.getView().getModel("PersonalizationModel").setProperty("/deletePersBtnVisible", false);
			this.getView().getModel("PersonalizationModel").setProperty("/createPersBtnVisible", true);
			this.getView().getModel("PersonalizationModel").setProperty("/editPersBtnVisible", true);
			this.getView().getModel("PersonalizationModel").setProperty("/varinatNameValueState", "None");
			this.getView().getModel("baseModel").setProperty("/SalesOrgValueState", "None");
			this.getView().getModel("baseModel").setProperty("/matGrpValueState", "None");
			this.getView().getModel("baseModel").setProperty("/EndingStckplantValueState", "None");
			this.getView().getModel("baseModel").setProperty("/EndingStckSLocValueState", "None");
			this.getView().getModel("baseModel").setProperty("/postingDateValueStateFrom", "None");
			this.getView().getModel("baseModel").setProperty("/blocked", false);
			this.getView().getModel("PersonalizationModel").refresh();
			this.getView().getModel("baseModel").setProperty("/plantTo", "");
			this.getView().getModel("baseModel").setProperty("/plantFrom", "");
			this.getView().getModel("baseModel").setProperty("/salesOrgFrom", "");
			this.getView().getModel("baseModel").setProperty("/salesOrgTo", "");
			this.getView().getModel("baseModel").setProperty("/matTo", "");
			this.getView().getModel("baseModel").setProperty("/matFrom", "");
			this.getView().getModel("baseModel").setProperty("/matGrpTo", "");
			this.getView().getModel("baseModel").setProperty("/matGrpFrom", "");
			this.getView().getModel("baseModel").setProperty("/matGrp4To", "");
			this.getView().getModel("baseModel").setProperty("/matGrp4From", "");
			this.getView().getModel("baseModel").setProperty("/vendMatTo", "");
			this.getView().getModel("baseModel").setProperty("/vendMatFrom", "");
			this.getView().getModel("baseModel").setProperty("/SLocTo", "");
			this.getView().getModel("baseModel").setProperty("/SLocFrom", "");
			this.getView().getModel("baseModel").setProperty("/enableSLocTo", true);
			this.getView().getModel("baseModel").setProperty("/postingDateFrom", "");
			this.getView().getModel("baseModel").setProperty("/postingDateTo", "");
			this.getView().getModel("baseModel").setProperty("/endingStockDateFrom", "");
			this.getView().getModel("baseModel").setProperty("/movementTypeFrom", "");
			this.getView().getModel("baseModel").setProperty("/matDocFrom", "");
			this.getView().getModel("baseModel").setProperty("/expDateFrom", "");
			this.getView().getModel("baseModel").setProperty("/expDateTo", "");
			this.getView().getModel("baseModel").setProperty("/month", "");
			this.getView().getModel("baseModel").setProperty("/vendMatFrom", "");
			this.getView().getModel("baseModel").setProperty("/vendMatTo", "");
			this.getView().getModel("baseModel").setProperty("/enablematTo", true);
			this.getView().getModel("baseModel").setProperty("/enablematGrpTo", true);
			this.getView().getModel("baseModel").setProperty("/enablematGrp4To", true);
			this.getView().getModel("baseModel").setProperty("/enablePlantTo", true);
			this.getView().getModel("baseModel").setProperty("/enableSalesOrgTo", true);
			this.getView().getModel("baseModel").setProperty("/enableVendorMat", true);
			this.getView().getModel("baseModel").setProperty("/EndingStckSelAllMaterial", true);
			this.getView().getModel("baseModel").setProperty("/batchLevel", false);
			this.getView().getModel("baseModel").setProperty("/sLocLevel", false);
			this.getView().getModel("baseModel").setProperty("/serialNo", false);
			this.getView().getModel("baseModel").setProperty("/excludeFda", false);
			this.getView().getModel("baseModel").setProperty("/salesUnit", false);
			this.getView().getModel("baseModel").setProperty("/baseUnit", true);
			this.getView().getModel("baseModel").setProperty("/unrestricted", false);
			this.getView().getModel("baseModel").setProperty("/QI", false);
			this.getView().getModel("baseModel").setProperty("/rawMaterial", false);
			this.getView().getModel("baseModel").setProperty("/IncBufferStockStkLotVal", false);
			this.getView().getModel("baseModel").setProperty("/ShowSalesUqtyStkLotVal", false);
			this.getView().getModel("baseModel").setProperty("/ShowAllStocksStkLotVal", true);
			this.getView().getModel("baseModel").setProperty("/onlyQIStkLotVal", false);
			this.getView().getModel("baseModel").setProperty("/onlyUnrestStkLotVal", false);
			this.getView().getModel("baseModel").setProperty("/showStock", false);
			this.getView().getModel("baseModel").setProperty("/showQTY", false);
			this.getView().getModel("baseModel").setProperty("/salesMat", false);
			this.allMaterials = "allMaterials eq " + "'X'";
			this.byEndingPeriod = "byEndingPeriod eq " + "'X'";
			this.onlyShowAllStk = "allStock eq " + "'X'";
			this.getView().getModel("baseModel").setProperty("/EndingStckSelVenConsMat", false);
			this.getView().getModel("baseModel").setProperty("/EndingStckSelchngeOwnStkMat", false);
			this.getView().getModel("baseModel").setProperty("/EndingStckSelEndPrd", true);
			this.getView().getModel("baseModel").setProperty("/EndingStckSelByAsDte", false);
			this.getView().getModel("baseModel").refresh()
		},
		createColumnConfigEndingStock: function () {
			return [{
				label: "Material",
				property: "materialNum"
			}, {
				label: "Material Description",
				property: "materialDesc"
			}, {
				label: "Quantity",
				property: "bigQuantity"
			}, {
				label: "Unit",
				property: "saleUnit"
			}, {
				label: "Storage Location",
				property: "storageLocation"
			}, {
				label: "Old Code",
				property: "oldCode"
			}, {
				label: "Vendor Material",
				property: "vendorMaterial"
			}, {
				label: "Real Batch",
				property: "realBatch"
			}, {
				label: "Expiry Date",
				property: "expireDateReport"
			}, {
				label: "Manufacture Date",
				property: "manufDateReport"
			}, {
				label: "Per Pack",
				property: "perPack"
			}, {
				label: "Value",
				property: "value"
			}, {
				label: "Serial Number",
				property: "serialNum"
			}]
		},
		createColumnConfigATPOverview: function () {
			return [{
				label: "Material",
				property: "materialNum"
			}, {
				label: "Material Description",
				property: "materialDesc"
			}, {
				label: "Plant",
				property: "plant"
			}, {
				label: "Storage Location",
				property: "storageLocation"
			}, {
				label: "Batch",
				property: "batchNumber"
			}, {
				label: "Exp. Date",
				property: "expiredDateReport"
			}, {
				label: "Stock Qty",
				property: "stockQty"
			}, {
				label: "Req. Qty",
				property: "requiredQty"
			}, {
				label: "Confirm Qty",
				property: "confirmQty"
			}, {
				label: "ATP Qty",
				property: "atpQty"
			}, {
				label: "Short Qty",
				property: "shortQtyReport"
			}, {
				label: "Unit",
				property: "baseUnit"
			}, {
				label: "LTP/Price",
				property: "ltpPrice"
			}, {
				label: "Serial No",
				property: "serialNum"
			}]
		},
		createColumnConfigExpiryStock: function () {
			return [{
				label: "Material",
				property: "materialNum"
			}, {
				label: "Material Description",
				property: "materialDesc"
			}, {
				label: "Material Group",
				property: "materialGroup"
			}, {
				label: "Material Group Description",
				property: "matGroupDesc"
			}, {
				label: "Batch",
				property: "batch"
			}, {
				label: "Expiry Date",
				property: "shelflLifeDateReport"
			}, {
				label: "Manufacture Date",
				property: "manufDateReport"
			}, {
				label: "Material Group4",
				property: "materialGroup4"
			}, {
				label: "Material Group4 Description",
				property: "matGroup4Desc"
			}, {
				label: "Vendor Material",
				property: "prodInsMemo"
			}, {
				label: "Long Batch",
				property: "batch"
			}, {
				label: "RSL Days",
				property: "rslDays"
			}, {
				label: "Storage Location",
				property: "storageLocation"
			}, {
				label: "Unit",
				property: "baseUOM"
			}, {
				label: "Value",
				property: "rate"
			}, {
				label: "Expired",
				property: "expired"
			}, {
				label: "3 Months",
				property: "expired3"
			}, {
				label: "6 Months",
				property: "expired6"
			}, {
				label: "9 Months",
				property: "expired9"
			}, {
				label: "12 Months",
				property: "expired12"
			}, {
				label: "15 Months",
				property: "expired15"
			}, {
				label: "18 Months",
				property: "expired18"
			}, {
				label: "Serial No",
				property: "serialNum"
			}]
		},
		createColumnConfigMatMov: function () {
			return [{
				label: "Material",
				property: "materialNum"
			}, {
				label: "Material Description",
				property: "materialDesc"
			}, {
				label: "Material Document",
				property: "materialDocument"
			}, {
				label: "Material Vendor",
				property: "vendorMaterial"
			}, {
				label: "Storage Location",
				property: "storageLocation"
			}, {
				label: "Batch",
				property: "batchNumber"
			}, {
				label: "Exp. Date",
				property: "shelflLifeDateReport"
			}, {
				label: "Posting Date",
				property: "postingDateReport"
			}, {
				label: "Quantity",
				property: "quantity"
			}, {
				label: "Sales Quantity",
				property: "bigQuantity"
			}, {
				label: "Material Group",
				property: "materialGroup"
			}, {
				label: "Material Group Description",
				property: "materialGroupDesc"
			}, {
				label: "Material Group4",
				property: "materialGroup4"
			}, {
				label: "Base Unit",
				property: "baseUnit"
			}, {
				label: "Sale Unit",
				property: "saleUnit"
			}, {
				label: "GR/GI Storage Location",
				property: "receivingStorageLocation"
			}, {
				label: "Per Pack",
				property: "packSize"
			}, {
				label: "Spc. IND",
				property: "splStockIndicator"
			}, {
				label: "Movement",
				property: "movementType"
			}, {
				label: "Movement Description",
				property: "textStockType"
			}, {
				label: "DO Number",
				property: "referenceDocNum"
			}, {
				label: "Header Note",
				property: "headerNote"
			}, {
				label: "Serial No",
				property: "serialNum"
			}]
		},
		onExportATPoverview: function (e, t, s) {
			var e = this.getView().getModel("ATPOverviewTableModel").getData().results;
			var t = "ATP Overview";
			var s = true;
			var r = [];
			var a = e;
			var l = "";
			var i = this;
			l += t + "\r\n";
			if (s) {
				var n = "";
				n = n.slice(0, -1);
				l += n + "\r\n"
			}
			var d = this.getView().getModel("PersonalizationModel").getProperty("/personalizationData/userPersonaDto");
			var h = "";
			var n = "";
			for (var p = 0; p < d.length; p++) {
				if (d[p].status === true) {
					if (d[p].enabledKey === "Material") {
						h = h + '"' + "Material Num" + '","' + "Material Desc" + '","'
					} else if (d[p].enabledKey === "Plant") {
						h = h + "Plant" + '","'
					} else if (d[p].enabledKey === "Plant") {
						h = h + "Plant" + '","'
					} else if (d[p].enabledKey === "Serial No.") {
						h = h + "Serial No." + '","'
					} else if (d[p].enabledKey === "SLOC") {
						h = h + "Storage Location" + '","'
					} else if (d[p].enabledKey === "Batch") {
						h = h + "Batch" + '","'
					} else if (d[p].enabledKey === "Exp. Date") {
						h = h + "Expiry Date" + '","'
					} else if (d[p].enabledKey === "Req. Qty") {
						h = h + "Req. Qty" + '","'
					} else if (d[p].enabledKey === "Confirm Qty") {
						h = h + "Confirm Qty" + '","'
					} else if (d[p].enabledKey === "ATP Qty") {
						h = h + "ATP Qty" + '","'
					} else if (d[p].enabledKey === "Short Qty") {
						h = h + "Short Qty" + '","'
					} else if (d[p].enabledKey === "Unit") {
						h = h + "Unit" + '","'
					} else if (d[p].enabledKey === "LTP/Price") {
						h = h + "LTP/Price" + '","'
					} else if (d[p].enabledKey === "Stock Qty") {
						h = h + "Stock Qty" + '","'
					}
					if (p === d.length - 1) {}
				}
			}
			h = h.slice(0, h.length - 3);
			h = h + '",';
			l += h + "\r\n";
			for (var c = 0; c < a.length; c++) {
				var n = "";
				for (var p = 0; p < d.length; p++) {
					if (d[p].status === true) {
						if (d[p].enabledKey === "Material") {
							n = n + '"' + a[c].materialNum + '","' + a[c].materialDesc + '","'
						} else if (d[p].enabledKey === "Plant") {
							n = n + a[c].plant + '","'
						} else if (d[p].enabledKey === "Serial No.") {
							n = n + a[c].serialNum + '","'
						} else if (d[p].enabledKey === "SLOC") {
							n = n + a[c].storageLocation + '","'
						} else if (d[p].enabledKey === "Batch") {
							n = n + a[c].batchNumber + '","'
						} else if (d[p].enabledKey === "Exp. Date") {
							n = n + o.convertToDateToDispFormat(a[c].expiredDate) + '","'
						} else if (d[p].enabledKey === "Req. Qty") {
							if (a[c].requiredQty !== "SUM") {
								n = n + parseFloat(a[c].requiredQty) + '","'
							} else {
								n = n + a[c].requiredQty + '","'
							}
						} else if (d[p].enabledKey === "Confirm Qty") {
							if (a[c].confirmQty !== "SUM") {
								n = n + parseFloat(a[c].confirmQty) + '","'
							} else {
								n = n + a[c].confirmQty + '","'
							}
						} else if (d[p].enabledKey === "ATP Qty") {
							if (a[c].atpQty !== "SUM") {
								n = n + parseFloat(a[c].atpQty) + '","'
							} else {
								n = n + a[c].atpQty + '","'
							}
						} else if (d[p].enabledKey === "Short Qty") {
							var g = o.shortQty(a[c].shortQty);
							if (g !== "SUM") {
								n = n + parseFloat(g) + '","'
							} else {
								n = n + g + '","'
							}
						} else if (d[p].enabledKey === "Unit") {
							n = n + a[c].baseUnit + '","'
						} else if (d[p].enabledKey === "LTP/Price") {
							n = n + a[c].ltpPrice + '","'
						} else if (d[p].enabledKey === "Stock Qty") {
							n = n + parseFloat(a[c].stockQty) + '","'
						}
						if (p === d.length - 1) {}
					}
				}
				n = n.slice(0, n.length - 1);
				l += n + "\r\n"
			}
			l += "\r\n";
			if (l === "") {
				sap.m.MessageToast.show("Invaild data");
				return
			}
			var m = "";
			m += t.replace(/ /g, "_");
			var u = "data:text/csv;charset=utf-8," + escape(l);
			var M = document.createElement("a");
			M.href = u;
			M.style = "visibility:hidden";
			M.download = m + ".csv";
			document.body.appendChild(M);
			M.click();
			document.body.removeChild(M)
		},
		onExportEndingStock: function () {
			var e = [];
			var t = this.getView().getModel("endingStckTableModel").getData().results;
			for (var s = 0; s < t.length; s++) {
				t[s].expireDateReport = o.date(t[s].expireDate);
				t[s].manufDateReport = o.manufDate(t[s].manufDate);
				t[s].bigQuantity = parseFloat(t[s].bigQuantity);
				t[s].value = parseFloat(t[s].value);
				t[s].perPack = parseFloat(t[s].perPack)
			}
			var r = this.getView().getModel("PersonalizationModel").getProperty("/personalizationData/userPersonaDto");
			var a = [];
			for (var s = 0; s < r.length; s++) {
				if (r[s].status === true) {
					if (r[s].enabledKey === "Material") {
						var l = {
							label: "Material",
							property: "materialNum"
						};
						a.push(l);
						var l = {
							label: "Material Description",
							property: "materialDesc"
						};
						a.push(l)
					} else if (r[s].enabledKey === "Old Mat No.") {
						var l = {
							label: "Old Code",
							property: "oldCode"
						};
						a.push(l)
					} else if (r[s].enabledKey === "Vendor Mat.") {
						var l = {
							label: "Vendor Material",
							property: "vendorMaterial"
						};
						a.push(l)
					} else if (r[s].enabledKey === "SLOC") {
						var l = {
							label: "Storage Location",
							property: "storageLocation"
						};
						a.push(l)
					} else if (r[s].enabledKey === "Real Batch") {
						var l = {
							label: "Real Batch",
							property: "realBatch"
						};
						a.push(l)
					} else if (r[s].enabledKey === "Exp. Date") {
						var l = {
							label: "Expiry Date",
							property: "expireDateReport"
						};
						a.push(l)
					} else if (r[s].enabledKey === "Manu. Date") {
						var l = {
							label: "Manufacture Date",
							property: "manufDateReport"
						};
						a.push(l)
					} else if (r[s].enabledKey === "Per Pack") {
						var l = {
							label: "Per Pack",
							property: "perPack",
							type: sap.ui.export.EdmType.Number,
							scale: 3
						};
						a.push(l)
					} else if (r[s].enabledKey === "Sales Qty") {
						var l = {
							label: "Quantity",
							property: "bigQuantity",
							type: sap.ui.export.EdmType.Number,
							scale: 3
						};
						a.push(l)
					} else if (r[s].enabledKey === "Value (LTP * QTY)") {
						var l = {
							label: "Value",
							property: "value",
							type: sap.ui.export.EdmType.Number,
							scale: 3
						};
						a.push(l)
					} else if (r[s].enabledKey === "Serial No.") {
						var l = {
							label: "Serial Number",
							property: "serialNum"
						};
						a.push(l)
					}
				}
			}
			this._onExport(t, a)
		},
		onExportExpiryStock: function () {
			var e = [];
			var t = this.getView().getModel("expiryStckTableModel").getData().results;
			for (var s = 0; s < t.length; s++) {
				t[s].shelflLifeDateReport = o.date(t[s].shelflLifeDate);
				t[s].manufDateReport = o.manufDate(t[s].manufDate);
				t[s].rate = parseFloat(t[s].rate);
				t[s].expired = parseFloat(t[s].expired);
				t[s].expired3 = parseFloat(t[s].expired3);
				t[s].expired6 = parseFloat(t[s].expired6);
				t[s].expired9 = parseFloat(t[s].expired9);
				t[s].expired12 = parseFloat(t[s].expired12);
				t[s].expired15 = parseFloat(t[s].expired15);
				t[s].expired18 = parseFloat(t[s].expired18)
			}
			var r = this.getView().getModel("PersonalizationModel").getProperty("/personalizationData/userPersonaDto");
			var a = [];
			for (var s = 0; s < r.length; s++) {
				if (r[s].status === true) {
					if (r[s].enabledKey === "Material Group") {
						var l = {
							label: "Material Group",
							property: "materialGroup"
						};
						a.push(l);
						var l = {
							label: "Material Group Description",
							property: "matGroupDesc"
						};
						a.push(l)
					} else if (r[s].enabledKey === "Material Group 4") {
						var l = {
							label: "Material Group4",
							property: "materialGroup4"
						};
						a.push(l);
						var l = {
							label: "Material Group4 Description",
							property: "matGroup4Desc"
						};
						a.push(l)
					} else if (r[s].enabledKey === "Material") {
						var l = {
							label: "Material",
							property: "materialNum"
						};
						a.push(l);
						var l = {
							label: "Material Description",
							property: "materialDesc"
						};
						a.push(l)
					} else if (r[s].enabledKey === "Vendor Mat.") {
						var l = {
							label: "Vendor Material",
							property: "prodInsMemo"
						};
						a.push(l)
					} else if (r[s].enabledKey === "Batch") {
						var l = {
							label: "Batch",
							property: "batch"
						};
						a.push(l)
					} else if (r[s].enabledKey === "Long Batch") {
						var l = {
							label: "Long Batch",
							property: "batch"
						};
						a.push(l)
					} else if (r[s].enabledKey === "LTP / Price") {
						var l = {
							label: "Value",
							property: "rate",
							type: sap.ui.export.EdmType.Number,
							scale: 3
						};
						a.push(l)
					} else if (r[s].enabledKey === "RSL Days") {
						var l = {
							label: "RSL Days",
							property: "rslDays"
						};
						a.push(l)
					} else if (r[s].enabledKey === "Exp. Date") {
						var l = {
							label: "Expiry Date",
							property: "shelflLifeDateReport"
						};
						a.push(l)
					} else if (r[s].enabledKey === "Manu. Date") {
						var l = {
							label: "Manufacture Date",
							property: "manufDateReport"
						};
						a.push(l)
					} else if (r[s].enabledKey === "Unit") {
						var l = {
							label: "Unit",
							property: "baseUOM"
						};
						a.push(l)
					} else if (r[s].enabledKey === "SLOC") {
						var l = {
							label: "Storage Location",
							property: "storageLocation"
						};
						a.push(l)
					} else if (r[s].enabledKey === "Expired") {
						var l = {
							label: "Expired",
							property: "expired",
							type: sap.ui.export.EdmType.Number,
							scale: 3
						};
						a.push(l)
					} else if (r[s].enabledKey === "3 Months") {
						var l = {
							label: "3 Months",
							property: "expired3",
							type: sap.ui.export.EdmType.Number,
							scale: 3
						};
						a.push(l)
					} else if (r[s].enabledKey === "6 Months") {
						var l = {
							label: "6 Months",
							property: "expired6",
							type: sap.ui.export.EdmType.Number,
							scale: 3
						};
						a.push(l)
					} else if (r[s].enabledKey === "9 Months") {
						var l = {
							label: "9 Months",
							property: "expired9",
							type: sap.ui.export.EdmType.Number,
							scale: 3
						};
						a.push(l)
					} else if (r[s].enabledKey === "12 Months") {
						var l = {
							label: "12 Months",
							property: "expired12",
							type: sap.ui.export.EdmType.Number,
							scale: 3
						};
						a.push(l)
					} else if (r[s].enabledKey === "15 Months") {
						var l = {
							label: "15 Months",
							property: "expired15",
							type: sap.ui.export.EdmType.Number,
							scale: 3
						};
						a.push(l)
					} else if (r[s].enabledKey === "18 Months") {
						var l = {
							label: "18 Months",
							property: "expired18",
							type: sap.ui.export.EdmType.Number,
							scale: 3
						};
						a.push(l)
					} else if (r[s].enabledKey === "Serial no.") {
						var l = {
							label: "Serial No",
							property: "serialNum"
						};
						a.push(l)
					}
				}
			}
			this._onExport(t, a)
		},
		onExportMatMov: function () {
			var e = [];
			var t = this.getView().getModel("mavMovTableModel").getData().results;
			for (var s = 0; s < t.length; s++) {
				t[s].shelflLifeDateReport = o.date(t[s].shelflLifeDate);
				t[s].postingDateReport = o.date(t[s].postingDate);
				t[s].quantity = parseFloat(t[s].quantity);
				t[s].bigQuantity = parseFloat(t[s].bigQuantity);
				t[s].packSize = parseFloat(t[s].packSize)
			}
			var r = this.getView().getModel("PersonalizationModel").getProperty("/personalizationData/userPersonaDto");
			var a = [];
			for (var s = 0; s < r.length; s++) {
				if (r[s].status === true) {
					if (r[s].enabledKey === "Mat. Doc.") {
						var l = {
							label: "Material Document",
							property: "materialDocument"
						};
						a.push(l)
					} else if (r[s].enabledKey === "Material") {
						var l = {
							label: "Material",
							property: "materialNum"
						};
						a.push(l);
						var l = {
							label: "Material Description",
							property: "materialDesc"
						};
						a.push(l)
					} else if (r[s].enabledKey === "Date") {
						var l = {
							label: "Exp. Date",
							property: "shelflLifeDateReport"
						};
						a.push(l)
					} else if (r[s].enabledKey === "Vendor Mat.") {
						var l = {
							label: "Vendor Material",
							property: "vendorMaterial"
						};
						a.push(l)
					} else if (r[s].enabledKey === "Material Group") {
						var l = {
							label: "Material Group",
							property: "materialGroup"
						};
						a.push(l);
						var l = {
							label: "Material Group Description",
							property: "materialGroupDesc"
						};
						a.push(l)
					} else if (r[s].enabledKey === "Material Group4") {
						var l = {
							label: "Material Group4",
							property: "materialGroup4"
						};
						a.push(l)
					} else if (r[s].enabledKey === "Exp. Date") {
						var l = {
							label: "Exp. Date",
							property: "shelflLifeDateReport"
						};
						a.push(l)
					} else if (r[s].enabledKey === "Real Batch") {
						var l = {
							label: "Batch",
							property: "batchNumber"
						};
						a.push(l)
					} else if (r[s].enabledKey === "SLOC") {
						var l = {
							label: "Storage Location",
							property: "storageLocation"
						};
						a.push(l)
					} else if (defaultVariant[i].enabledKey === "SLOC Desc.") {
						var key = {
							label: 'Storage Location Desc',
							property: 'storageLocationDesc'
						};
						cols.push(key);
					} else if (r[s].enabledKey === "GR/GI SLOC") {
						var l = {
							label: "GR/GI Storage Location",
							property: "receivingStorageLocation"
						};
						a.push(l)
					} else if (r[s].enabledKey === "Per Pack") {
						var l = {
							label: "Per Pack",
							property: "packSize",
							type: sap.ui.export.EdmType.Number,
							scale: 3
						};
						a.push(l)
					} else if (r[s].enabledKey === "Qty") {
						var l = {
							label: "Quantity",
							property: "quantity",
							type: sap.ui.export.EdmType.Number,
							scale: 3
						};
						a.push(l)
					} else if (r[s].enabledKey === "Sales Qty") {
						var l = {
							label: "Sales Quantity",
							property: "bigQuantity",
							type: sap.ui.export.EdmType.Number,
							scale: 3
						};
						a.push(l)
					} else if (r[s].enabledKey === "Spc. IND") {
						var l = {
							label: "Spc. IND",
							property: "splStockIndicator"
						};
						a.push(l)
					} else if (r[s].enabledKey === "Movement") {
						var l = {
							label: "Movement",
							property: "movementType"
						};
						a.push(l)
					} else if (r[s].enabledKey === "DO Number") {
						var l = {
							label: "DO Number",
							property: "referenceDocNum"
						};
						a.push(l)
					} else if (r[s].enabledKey === "Header Note") {
						var l = {
							label: "Header Note",
							property: "headerNote"
						};
						a.push(l)
					} else if (r[s].enabledKey === "Serial No.") {
						var l = {
							label: "Serial No",
							property: "serialNum"
						};
						a.push(l)
					}
				}
			}
			this._onExport(t, a)
		},
		_onExport: function (e, t) {
			var t, s, r;
			t = t;
			s = {
				workbook: {
					columns: t
				},
				dataSource: e,
				showProgress: false
			};
			r = new i(s);
			r.build().then(function () {
				a.show("spreadsheet Export Finished")
			}).finally(function () {
				r.destroy()
			})
		},
		ATPOverviewSearch: function () {
			var e = this;
			var t = "/DKSHODataService/sap/opu/odata/sap/ZDKSH_CC_INVENTORY_ENQUIRIES_SRV/ATP_OverviewSet?$filter=";
			var r;
			var a;
			var o;
			var l;
			var i;
			var n;
			var d = this.getView().getModel("baseModel").getData();
			if (this.salesOrgFromSelectedItems.length === 0) {
				s.error("Enter all the madatory fields");
				return
			} else if (this.salesOrgFromSelectedItems.length === 1) {
				d.SalesOrgValueState = "None";
				r = "salesOrg eq " + "'" + this.salesOrgFromSelectedItems[0] + "'";
				if (t.length === 93) {
					t = t + r
				} else {
					t = t + " " + "and" + " " + r
				}
			} else if (this.salesOrgFromSelectedItems.length > 1) {
				d.SalesOrgValueState = "None";
				for (var h = 0; h < this.salesOrgFromSelectedItems.length; h++) {
					if (r === undefined) {
						r = "(salesOrg eq " + "'" + this.salesOrgFromSelectedItems[h] + "'"
					} else {
						if (h === this.salesOrgFromSelectedItems.length - 1) {
							r = r + " " + "or" + " " + "salesOrg eq " + "'" + this.salesOrgFromSelectedItems[h] + "')"
						} else {
							r = r + " " + "or" + " " + "salesOrg eq " + "'" + this.salesOrgFromSelectedItems[h] + "'"
						}
					}
				}
				if (t.length === 93) {
					t = t + r
				} else {
					t = t + " " + "and" + " " + r
				}
			}
			if (this.SLocFromSelectedItems.length === 0) {
				if (e.SLOCDataAccess !== undefined && e.SLOCDataAccess !== "") {
					a = "storageLocation eq " + "'" + e.SLOCDataAccess + "'"
				}
			} else if (this.SLocFromSelectedItems.length === 1) {
				if (this.SLocToSelectedItems.length === 1) {
					a = "( storageLocation ge " + "'" + this.SLocFromSelectedItems[0] + "'" + " and " + "storageLocation le " + "'" + this.SLocToSelectedItems[
						0] + "' )"
				} else {
					a = "storageLocation eq " + "'" + this.SLocFromSelectedItems[0] + "'"
				}
				if (t.length === 93) {
					t = t + a
				} else {
					t = t + " " + "and" + " " + a
				}
			} else if (this.SLocFromSelectedItems.length > 1) {
				for (var h = 0; h < this.SLocFromSelectedItems.length; h++) {
					if (a === undefined) {
						a = "(storageLocation eq " + "'" + this.SLocFromSelectedItems[h] + "'"
					} else {
						if (h === this.SLocFromSelectedItems.length - 1) {
							a = a + " " + "or" + " " + "storageLocation eq " + "'" + this.SLocFromSelectedItems[h] + "')"
						} else {
							a = a + " " + "or" + " " + "storageLocation eq " + "'" + this.SLocFromSelectedItems[h] + "'"
						}
					}
				}
				if (t.length === 93) {
					t = t + a
				} else {
					t = t + " " + "and" + " " + a
				}
			}
			if (this.selectedVendorMatFrom.length === 0) {} else if (this.selectedVendorMatFrom.length === 1) {
				if (this.selectedVendorMatTo.length === 1) {
					n = "( vendorMaterial ge " + "'" + this.selectedVendorMatFrom[0] + "'" + " and " + "vendorMaterial le " + "'" + this.selectedVendorMatTo[
						0] + "' )"
				} else {
					n = "vendorMaterial eq " + "'" + this.selectedVendorMatFrom[0] + "'"
				}
				if (t.length === 93) {
					t = t + n
				} else {
					t = t + " " + "and" + " " + n
				}
			} else if (this.selectedVendorMatFrom.length > 1) {
				for (var h = 0; h < this.selectedVendorMatFrom.length; h++) {
					if (n === undefined) {
						n = "(vendorMaterial eq " + "'" + this.selectedVendorMatFrom[h] + "'"
					} else {
						if (h === this.selectedVendorMatFrom.length - 1) {
							n = n + " " + "or" + " " + "vendorMaterial eq " + "'" + this.selectedVendorMatFrom[h] + "')"
						} else {
							n = n + " " + "or" + " " + "vendorMaterial eq " + "'" + this.selectedVendorMatFrom[h] + "'"
						}
					}
				}
				if (t.length === 93) {
					t = t + n
				} else {
					t = t + " " + "and" + " " + n
				}
			}
			if (this.MatGrpFromSelectedItems.length === 0) {
				s.error("Enter all the madatory fields");
				return
			} else if (this.MatGrpFromSelectedItems.length === 1) {
				if (this.MatGrpToSelectedItems.length === 1) {
					o = "( materialGroup ge " + "'" + this.MatGrpFromSelectedItems[0] + "'" + " and " + "materialGroup le " + "'" + this.MatGrpToSelectedItems[
						0] + "' )"
				} else {
					o = "materialGroup eq " + "'" + this.MatGrpFromSelectedItems[0] + "'"
				}
				if (t.length === 93) {
					t = t + o
				} else {
					t = t + " " + "and" + " " + o
				}
			} else if (this.MatGrpFromSelectedItems.length > 1) {
				for (var h = 0; h < this.MatGrpFromSelectedItems.length; h++) {
					if (o === undefined) {
						o = "(materialGroup eq " + "'" + this.MatGrpFromSelectedItems[h] + "'"
					} else {
						if (h === this.MatGrpFromSelectedItems.length - 1) {
							o = o + " " + "or" + " " + "materialGroup eq " + "'" + this.MatGrpFromSelectedItems[h] + "')"
						} else {
							o = o + " " + "or" + " " + "materialGroup eq " + "'" + this.MatGrpFromSelectedItems[h] + "'"
						}
					}
				}
				if (t.length === 93) {
					t = t + o
				} else {
					t = t + " " + "and" + " " + o
				}
			}
			if (this.MatGrp4FromSelectedItems.length === 0) {
				if (e.materialGroup4DataAccess !== undefined && e.materialGroup4DataAccess !== "") {
					l = "materialGroup4 eq " + "('" + e.materialGroup4DataAccess + "')";
					if (t.length === 93) {
						t = t + l
					} else {
						t = t + " " + "and" + " " + l
					}
				}
			} else if (this.MatGrp4FromSelectedItems.length === 1) {
				if (this.MatGrp4ToSelectedItems.length === 1) {
					l = "( materialGroup4 ge " + "'" + this.MatGrp4FromSelectedItems[0] + "'" + " and " + "materialGroup4 le " + "'" + this.MatGrp4ToSelectedItems[
						0] + "' )"
				} else {
					l = "materialGroup4 eq " + "'" + this.MatGrp4FromSelectedItems[0] + "'"
				}
				if (t.length === 93) {
					t = t + l
				} else {
					t = t + " " + "and" + " " + l
				}
			} else if (this.MatGrp4FromSelectedItems.length > 1) {
				for (var h = 0; h < this.MatGrp4FromSelectedItems.length; h++) {
					if (l === undefined) {
						l = "(materialGroup4 eq " + "'" + this.MatGrp4FromSelectedItems[h] + "'"
					} else {
						if (h === this.MatGrp4FromSelectedItems.length - 1) {
							l = l + " " + "or" + " " + "materialGroup4 eq " + "'" + this.MatGrp4FromSelectedItems[h] + "')"
						} else {
							l = l + " " + "or" + " " + "materialGroup4 eq " + "'" + this.MatGrp4FromSelectedItems[h] + "'"
						}
					}
				}
				if (t.length === 93) {
					t = t + l
				} else {
					t = t + " " + "and" + " " + l
				}
			}
			if (this.selectedMatFromItems.length === 0) {} else if (this.selectedMatFromItems.length === 1) {
				if (this.selectedMatToItems.length === 1) {
					i = "( materialNum ge " + "'" + this.selectedMatFromItems[0] + "'" + " and " + "materialNum le " + "'" + this.selectedMatToItems[
						0] + "' )"
				} else {
					i = "materialNum eq " + "'" + this.selectedMatFromItems[0] + "'"
				}
				if (t.length === 93) {
					t = t + i
				} else {
					t = t + " " + "and" + " " + i
				}
			} else if (this.selectedMatFromItems.length > 1) {
				for (var h = 0; h < this.selectedMatFromItems.length; h++) {
					if (i === undefined) {
						i = "(materialNum eq " + "'" + this.selectedMatFromItems[h] + "'"
					} else {
						if (h === this.selectedMatFromItems.length - 1) {
							i = i + " " + "or" + " " + "materialNum eq " + "'" + this.selectedMatFromItems[h] + "')"
						} else {
							i = i + " " + "or" + " " + "materialNum eq " + "'" + this.selectedMatFromItems[h] + "'"
						}
					}
				}
				if (t.length === 93) {
					t = t + i
				} else {
					t = t + " " + "and" + " " + i
				}
			}
			if (this.SlocLevel !== "" && this.SlocLevel !== undefined) {
				if (t.length === 93) {
					t = t + this.SlocLevel
				} else {
					t = t + " " + "and" + " " + this.SlocLevel
				}
			}
			if (this.BatchLevel !== "" && this.BatchLevel !== undefined) {
				if (t.length === 93) {
					t = t + this.BatchLevel
				} else {
					t = t + " " + "and" + " " + this.BatchLevel
				}
			}
			if (this.serialNo !== "" && this.serialNo !== undefined) {
				if (t.length === 93) {
					t = t + this.serialNo
				} else {
					t = t + " " + "and" + " " + this.serialNo
				}
			}
			var p = this.getView().getModel("ZDKSH_CC_INVENTORY_ENQUIRIES_SRV");
			t = t + "&$format=json";
			var c = new sap.m.BusyDialog;
			c.open();
			$.ajax({
				url: t,
				method: "GET",
				async: true,
				success: function (t, s, r) {
					c.close();
					var t = t.d.results;
					for (var a = 0; a < t.length; a++) {
						if (t[a].storageLocation === "SUM" || t[a].batchNumber === "SUM") {
							t[a].atpQty = "SUM";
							t[a].shortQty = "SUM"
						}
					}
					var o = new sap.ui.model.json.JSONModel({
						results: t
					});
					o.setSizeLimit(o.getData().results.length);
					e.getView().setModel(o, "ATPOverviewTableModel");
					var l = "ATP Overview" + "(" + t.length + ")";
					e.getView().getModel("ATPOverviewTableModel").setProperty("/dataLength", l);
					e.getView().getModel("ATPOverviewTableModel").refresh();
					e.getView().getModel("baseModel").setProperty("/SearchVisiblity", false);
					e.getView().getModel("baseModel").setProperty("/CollapseVisiblity", false);
					e.getView().getModel("baseModel").setProperty("/openVisiblity", true);
					e.getView().getModel("baseModel").refresh()
				},
				error: function (t, s, r) {
					c.close();
					var a = new sap.ui.model.json.JSONModel({
						results: ""
					});
					e.getView().setModel(a, "ATPOverviewTableModel");
					e.getView().getModel("ATPOverviewTableModel").setProperty("/dataLength", "");
					e.getView().getModel("ATPOverviewTableModel").refresh();
					var o = "";
					if (t.status === 504) {
						o = "Request timed-out. Please try again using different search filters or add more search filters.";
						e.errorMsg(o)
					} else {
						o = t.responseJSON.error.message.value;
						e.errorMsg(o)
					}
				}
			})
		},
		onSearchATP: function (e) {
			if (e.getParameters().newValue === undefined) {
				var t = e.getParameters().query
			} else {
				var t = e.getParameters().newValue
			}
			var s = new Array;
			var r = new sap.ui.model.Filter([new sap.ui.model.Filter("materialNum", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter(
					"materialDesc", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter("storageLocation", sap.ui.model.FilterOperator
					.Contains, t), new sap.ui.model.Filter("atpQty", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter(
					"batchNumber", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter("expiredDate", sap.ui.model.FilterOperator.Contains,
					t), new sap.ui.model.Filter("plant", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter("stockQty", sap.ui.model
					.FilterOperator.Contains, t), new sap.ui.model.Filter("requiredQty", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model
				.Filter("confirmQty", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter("shortQty", sap.ui.model.FilterOperator.Contains,
					t), new sap.ui.model.Filter("baseUnit", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter("ltpPrice", sap.ui.model
					.FilterOperator.Contains, t), new sap.ui.model.Filter("serialNum", sap.ui.model.FilterOperator.Contains, t)
			]);
			s.push(r);
			var a = this.getView().byId("ATPOverviewTableID").getBinding("items");
			a.filter(s)
		},
		errorMsg: function (e) {
			sap.m.MessageBox.show(e, {
				styleClass: "sapUiSizeCompact",
				icon: sap.m.MessageBox.Icon.ERROR,
				title: "Error",
				actions: [sap.m.MessageBox.Action.OK],
				onClose: function (e) {}
			})
		},
		endingStockSearch: function () {
			var e = this;
			var t = "/DKSHODataService/sap/opu/odata/sap/ZDKSH_CC_INVENTORY_ENQUIRIES_SRV/EndingStockSet?$filter=";
			var r;
			var a;
			var o;
			var l;
			var i;
			var n;
			var d = this.getView().getModel("baseModel").getData();
			if (this.plantFromSelectedItems.length === 0) {
				s.error("Enter all the madatory fields");
				return
			} else if (this.plantFromSelectedItems.length === 1) {
				d.EndingStckplantValueState = "None";
				r = "plant eq " + "'" + this.plantFromSelectedItems[0] + "'";
				if (t.length === 92) {
					t = t + r
				} else {
					t = t + " " + "and" + " " + r
				}
			} else if (this.plantFromSelectedItems.length > 1) {
				d.EndingStckplantValueState = "None";
				for (var h = 0; h < this.plantFromSelectedItems.length; h++) {
					if (r === undefined) {
						r = "plant eq " + "('" + this.plantFromSelectedItems[h] + "'"
					} else {
						if (h === this.plantFromSelectedItems.length - 1) {
							r = r + " " + "or" + " " + "plant eq " + "'" + this.plantFromSelectedItems[h] + "')"
						} else {
							r = r + " " + "or" + " " + "plant eq " + "'" + this.plantFromSelectedItems[h] + "'"
						}
					}
				}
				if (t.length === 92) {
					t = t + r
				} else {
					t = t + " " + "and" + " " + r
				}
			}
			if (this.SLocFromSelectedItems.length === 0) {} else if (this.SLocFromSelectedItems.length === 1) {
				if (this.SLocToSelectedItems.length === 1) {
					a = "( storageLocation ge " + "'" + this.SLocFromSelectedItems[0] + "'" + " and " + "storageLocation le " + "'" + this.SLocToSelectedItems[
						0] + "' )"
				} else {
					a = "storageLocation eq " + "'" + this.SLocFromSelectedItems[0] + "'"
				}
				if (t.length === 92) {
					t = t + a
				} else {
					t = t + " " + "and" + " " + a
				}
			} else if (this.SLocFromSelectedItems.length > 1) {
				for (var h = 0; h < this.SLocFromSelectedItems.length; h++) {
					if (a === undefined) {
						a = "(storageLocation eq " + "'" + this.SLocFromSelectedItems[h] + "'"
					} else {
						if (h === this.SLocFromSelectedItems.length - 1) {
							a = a + " " + "or" + " " + "storageLocation eq " + "'" + this.SLocFromSelectedItems[h] + "')"
						} else {
							a = a + " " + "or" + " " + "storageLocation eq " + "'" + this.SLocFromSelectedItems[h] + "'"
						}
					}
				}
				if (t.length === 92) {
					t = t + a
				} else {
					t = t + " " + "and" + " " + a
				}
			}
			if (this.MatGrpFromSelectedItems.length === 0) {
				s.error("Enter all the madatory fields");
				return
			} else if (this.MatGrpFromSelectedItems.length === 1) {
				d.matGrpValueState = "None";
				if (this.MatGrpToSelectedItems.length === 1) {
					o = "( materialGroup ge " + "'" + this.MatGrpFromSelectedItems[0] + "'" + " and " + "materialGroup le " + "'" + this.MatGrpToSelectedItems[
						0] + "' )"
				} else {
					o = "materialGroup eq " + "'" + this.MatGrpFromSelectedItems[0] + "'"
				}
				if (t.length === 92) {
					t = t + o
				} else {
					t = t + " " + "and" + " " + o
				}
			} else if (this.MatGrpFromSelectedItems.length > 1) {
				for (var h = 0; h < this.MatGrpFromSelectedItems.length; h++) {
					if (o === undefined) {
						o = "(materialGroup eq " + "'" + this.MatGrpFromSelectedItems[h] + "'"
					} else {
						if (h === this.MatGrpFromSelectedItems.length - 1) {
							o = o + " " + "or" + " " + "materialGroup eq " + "'" + this.MatGrpFromSelectedItems[h] + "')"
						} else {
							o = o + " " + "or" + " " + "materialGroup eq " + "'" + this.MatGrpFromSelectedItems[h] + "'"
						}
					}
				}
				if (t.length === 92) {
					t = t + o
				} else {
					t = t + " " + "and" + " " + o
				}
			}
			if (this.MatGrp4FromSelectedItems.length === 0) {
				if (e.materialGroup4DataAccess !== undefined) {
					l = "materialGroup4 eq " + "('" + e.materialGroup4DataAccess + "')";
					if (t.length === 92) {
						t = t + l
					} else {
						t = t + " " + "and" + " " + l
					}
				}
			} else if (this.MatGrp4FromSelectedItems.length === 1) {
				if (this.MatGrp4ToSelectedItems.length === 1) {
					l = "( materialGroup4 ge " + "'" + this.MatGrp4FromSelectedItems[0] + "'" + " and " + "materialGroup4 le " + "'" + this.MatGrp4ToSelectedItems[
						0] + "' )"
				} else {
					l = "materialGroup4 eq " + "'" + this.MatGrp4FromSelectedItems[0] + "'"
				}
				if (t.length === 92) {
					t = t + l
				} else {
					t = t + " " + "and" + " " + l
				}
			} else if (this.MatGrp4FromSelectedItems.length > 1) {
				for (var h = 0; h < this.MatGrp4FromSelectedItems.length; h++) {
					if (l === undefined) {
						l = "(materialGroup4 eq " + "'" + this.MatGrp4FromSelectedItems[h] + "'"
					} else {
						if (h === this.MatGrp4FromSelectedItems.length - 1) {
							l = l + " " + "or" + " " + "materialGroup4 eq " + "'" + this.MatGrp4FromSelectedItems[h] + "')"
						} else {
							l = l + " " + "or" + " " + "materialGroup4 eq " + "'" + this.MatGrp4FromSelectedItems[h] + "'"
						}
					}
				}
				if (t.length === 92) {
					t = t + l
				} else {
					t = t + " " + "and" + " " + l
				}
			}
			if (this.selectedMatFromItems.length === 0) {} else if (this.selectedMatFromItems.length === 1) {
				if (this.selectedMatToItems.length === 1) {
					i = "( materialNum ge " + "'" + this.selectedMatFromItems[0] + "'" + " and " + "materialNum le " + "'" + this.selectedMatToItems[
						0] + "' )"
				} else {
					i = "materialNum eq " + "'" + this.selectedMatFromItems[0] + "'"
				}
				if (t.length === 92) {
					t = t + i
				} else {
					t = t + " " + "and" + " " + i
				}
			} else if (this.selectedMatFromItems.length > 1) {
				for (var h = 0; h < this.selectedMatFromItems.length; h++) {
					if (i === undefined) {
						i = "(materialNum eq " + "'" + this.selectedMatFromItems[h] + "'"
					} else {
						if (h === this.selectedMatFromItems.length - 1) {
							i = i + " " + "or" + " " + "materialNum eq " + "'" + this.selectedMatFromItems[h] + "')"
						} else {
							i = i + " " + "or" + " " + "materialNum eq " + "'" + this.selectedMatFromItems[h] + "'"
						}
					}
				}
				if (t.length === 92) {
					t = t + i
				} else {
					t = t + " " + "and" + " " + i
				}
			}
			if (this.selectedVendorMatFrom.length === 0) {} else if (this.selectedVendorMatFrom.length === 1) {
				if (this.selectedVendorMatTo.length === 1) {
					n = "( vendorMaterial ge " + "'" + this.selectedVendorMatFrom[0] + "'" + " and " + "vendorMaterial le " + "'" + this.selectedVendorMatTo[
						0] + "' )"
				} else {
					n = "vendorMaterial eq " + "'" + this.selectedVendorMatFrom[0] + "'"
				}
				if (t.length === 92) {
					t = t + n
				} else {
					t = t + " " + "and" + " " + n
				}
			} else if (this.selectedVendorMatFrom.length > 1) {
				for (var h = 0; h < this.selectedVendorMatFrom.length; h++) {
					if (n === undefined) {
						n = "(vendorMaterial eq " + "'" + this.selectedVendorMatFrom[h] + "'"
					} else {
						if (h === this.selectedVendorMatFrom.length - 1) {
							n = n + " " + "or" + " " + "vendorMaterial eq " + "'" + this.selectedVendorMatFrom[h] + "')"
						} else {
							n = n + " " + "or" + " " + "vendorMaterial eq " + "'" + this.selectedVendorMatFrom[h] + "'"
						}
					}
				}
				if (t.length === 92) {
					t = t + n
				} else {
					t = t + " " + "and" + " " + n
				}
			}
			if (this.byEndingPeriod !== "" && this.byEndingPeriod !== undefined) {
				if (this.spMonth !== "" && this.spMonth !== undefined) {
					if (t.length === 92) {
						t = t + this.spMonth
					} else {
						t = t + " " + "and" + " " + this.spMonth
					}
					if (t.length === 92) {
						t = t + this.byEndingPeriod
					} else {
						t = t + " " + "and" + " " + this.byEndingPeriod
					}
				} else {
					s.error("Enter Month");
					return
				}
			}
			if (this.serialNo !== "" && this.serialNo !== undefined) {
				if (t.length === 92) {
					t = t + this.serialNo
				} else {
					t = t + " " + "and" + " " + this.serialNo
				}
			}
			if (this.byAsAtDate !== "" && this.byAsAtDate !== undefined) {
				if (this.endingStckDateFrom !== "" && this.endingStckDateFrom !== undefined) {
					if (t.length === 92) {
						t = t + this.endingStckDateFrom
					} else {
						t = t + " " + "and" + " " + this.endingStckDateFrom
					}
					if (t.length === 92) {
						t = t + this.byAsAtDate
					} else {
						t = t + " " + "and" + " " + this.byAsAtDate
					}
				} else {
					s.error("Enter Date");
					return
				}
			}
			if (this.exFdaStock !== "" && this.exFdaStock !== undefined) {
				if (t.length === 92) {
					t = t + this.exFdaStock
				} else {
					t = t + " " + "and" + " " + this.exFdaStock
				}
			}
			if (this.allMaterials !== "" && this.allMaterials !== undefined) {
				if (t.length === 92) {
					t = t + this.allMaterials
				} else {
					t = t + " " + "and" + " " + this.allMaterials
				}
			}
			if (this.ownStkMaterial !== "" && this.ownStkMaterial !== undefined) {
				if (t.length === 92) {
					t = t + this.ownStkMaterial
				} else {
					t = t + " " + "and" + " " + this.ownStkMaterial
				}
			}
			if (this.venConsMaterial !== "" && this.venConsMaterial !== undefined) {
				if (t.length === 92) {
					t = t + this.venConsMaterial
				} else {
					t = t + " " + "and" + " " + this.venConsMaterial
				}
			}
			var p = this.getView().getModel("ZDKSH_CC_INVENTORY_ENQUIRIES_SRV");
			t = t + "&$format=json";
			var c = new sap.m.BusyDialog;
			c.open();
			$.ajax({
				url: t,
				method: "GET",
				async: true,
				success: function (t, s, r) {
					c.close();
					var a = new sap.ui.model.json.JSONModel({
						results: t.d.results
					});
					a.setSizeLimit(a.getData().results.length);
					e.getView().setModel(a, "endingStckTableModel");
					var o = "Ending Stock" + "(" + t.d.results.length + ")";
					e.getView().getModel("endingStckTableModel").setProperty("/dataLength", o);
					e.getView().getModel("endingStckTableModel").refresh();
					e.getView().getModel("baseModel").setProperty("/SearchVisiblity", false);
					e.getView().getModel("baseModel").setProperty("/CollapseVisiblity", false);
					e.getView().getModel("baseModel").setProperty("/openVisiblity", true);
					e.getView().getModel("baseModel").refresh()
				},
				error: function (t, s, r) {
					var a = new sap.ui.model.json.JSONModel({
						results: ""
					});
					e.getView().setModel(a, "endingStckTableModel");
					e.getView().getModel("endingStckTableModel").setProperty("/dataLength", "");
					e.getView().getModel("endingStckTableModel").refresh();
					c.close();
					var o = "";
					if (t.status === 504) {
						o = "Request timed-out. Please try again using different search filters or add more search filters.";
						e.errorMsg(o)
					} else {
						o = t.responseJSON.error.message.value;
						e.errorMsg(o)
					}
				}
			})
		},
		onSearchEndingStock: function (e) {
			if (e.getParameters().newValue === undefined) {
				var t = e.getParameters().query
			} else {
				var t = e.getParameters().newValue
			}
			var s = new Array;
			var r = new sap.ui.model.Filter([new sap.ui.model.Filter("materialNum", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter(
				"materialDesc", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter("storageLocation", sap.ui.model.FilterOperator
				.Contains, t), new sap.ui.model.Filter("bigQuantity", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter(
				"saleUnit", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter("vendorMatNum", sap.ui.model.FilterOperator.Contains,
				t), new sap.ui.model.Filter("realBatch", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter("oldCode", sap.ui.model
				.FilterOperator.Contains, t), new sap.ui.model.Filter("expireDate", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter(
				"manufDate", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter("perPack", sap.ui.model.FilterOperator.Contains,
				t), new sap.ui.model.Filter("value", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter("serialNum", sap.ui.model
				.FilterOperator.Contains, t)]);
			s.push(r);
			var a = this.getView().byId("endingStockTableId").getBinding("items");
			a.filter(s)
		},
		expiryStockSearch: function () {
			var e = this;
			var t = "/DKSHODataService/sap/opu/odata/sap/ZDKSH_CC_INVENTORY_ENQUIRIES_SRV/ExpiryStockSet?$filter=";
			var r;
			var a;
			var o;
			var l;
			var i;
			var n;
			var d = this.getView().getModel("baseModel").getData();
			if (this.plantFromSelectedItems.length === 0) {
				s.error("Enter all the mandatory fields");
				return
			} else if (this.plantFromSelectedItems.length === 1) {
				d.EndingStckplantValueState = "None";
				r = "plant eq " + "'" + this.plantFromSelectedItems[0] + "'";
				if (t.length === 92) {
					t = t + r
				} else {
					t = t + " " + "and" + " " + r
				}
			} else if (this.plantFromSelectedItems.length > 1) {
				d.EndingStckplantValueState = "None";
				for (var h = 0; h < this.plantFromSelectedItems.length; h++) {
					if (r === undefined) {
						r = "(plant eq " + "'" + this.plantFromSelectedItems[h] + "'"
					} else {
						if (h === this.plantFromSelectedItems.length - 1) {
							r = r + " " + "or" + " " + "plant eq " + "'" + this.plantFromSelectedItems[h] + "')"
						} else {
							r = r + " " + "or" + " " + "plant eq " + "'" + this.plantFromSelectedItems[h] + "'"
						}
					}
				}
				if (t.length === 92) {
					t = t + r
				} else {
					t = t + " " + "and" + " " + r
				}
			}
			if (this.SLocFromSelectedItems.length === 0) {} else if (this.SLocFromSelectedItems.length === 1) {
				if (this.SLocToSelectedItems.length === 1) {
					a = "( storageLocation ge " + "'" + this.SLocFromSelectedItems[0] + "'" + " and " + "storageLocation le " + "'" + this.SLocToSelectedItems[
						0] + "' )"
				} else {
					a = "storageLocation eq " + "'" + this.SLocFromSelectedItems[0] + "'"
				}
				if (t.length === 92) {
					t = t + a
				} else {
					t = t + " " + "and" + " " + a
				}
			} else if (this.SLocFromSelectedItems.length > 1) {
				for (var h = 0; h < this.SLocFromSelectedItems.length; h++) {
					if (a === undefined) {
						a = "(storageLocation eq " + "'" + this.SLocFromSelectedItems[h] + "'"
					} else {
						if (h === this.SLocFromSelectedItems.length - 1) {
							a = a + " " + "or" + " " + "storageLocation eq " + "'" + this.SLocFromSelectedItems[h] + "')"
						} else {
							a = a + " " + "or" + " " + "storageLocation eq " + "'" + this.SLocFromSelectedItems[h] + "'"
						}
					}
				}
				if (t.length === 92) {
					t = t + a
				} else {
					t = t + " " + "and" + " " + a
				}
			}
			if (this.MatGrpFromSelectedItems.length === 0) {
				s.error("Material Group is mandatory");
				return
			} else if (this.MatGrpFromSelectedItems.length === 1) {
				if (this.MatGrpToSelectedItems.length === 1) {
					o = "( materialGroup ge " + "'" + this.MatGrpFromSelectedItems[0] + "'" + " and " + "materialGroup le " + "'" + this.MatGrpToSelectedItems[
						0] + "' )"
				} else {
					o = "materialGroup eq " + "'" + this.MatGrpFromSelectedItems[0] + "'"
				}
				if (t.length === 92) {
					t = t + o
				} else {
					t = t + " " + "and" + " " + o
				}
			} else if (this.MatGrpFromSelectedItems.length > 1) {
				for (var h = 0; h < this.MatGrpFromSelectedItems.length; h++) {
					if (o === undefined) {
						o = "(materialGroup eq " + "'" + this.MatGrpFromSelectedItems[h] + "'"
					} else {
						if (h === this.MatGrpFromSelectedItems.length - 1) {
							o = o + " " + "or" + " " + "materialGroup eq " + "'" + this.MatGrpFromSelectedItems[h] + "')"
						} else {
							o = o + " " + "or" + " " + "materialGroup eq " + "'" + this.MatGrpFromSelectedItems[h] + "'"
						}
					}
				}
				if (t.length === 92) {
					t = t + o
				} else {
					t = t + " " + "and" + " " + o
				}
			}
			if (this.MatGrp4FromSelectedItems.length === 0) {
				if (e.materialGroup4DataAccess !== undefined && e.materialGroup4DataAccess !== "") {
					l = "materialGroup4 eq " + "('" + e.materialGroup4DataAccess + "')";
					if (t.length === 92) {
						t = t + l
					} else {
						t = t + " " + "and" + " " + l
					}
				}
			} else if (this.MatGrp4FromSelectedItems.length === 1) {
				if (this.MatGrp4ToSelectedItems.length === 1) {
					l = "( materialGroup4 ge " + "'" + this.MatGrp4FromSelectedItems[0] + "'" + " and " + "materialGroup4 le " + "'" + this.MatGrp4ToSelectedItems[
						0] + "' )"
				} else {
					l = "materialGroup4 eq " + "'" + this.MatGrp4FromSelectedItems[0] + "'"
				}
				if (t.length === 92) {
					t = t + l
				} else {
					t = t + " " + "and" + " " + l
				}
			} else if (this.MatGrp4FromSelectedItems.length > 1) {
				for (var h = 0; h < this.MatGrp4FromSelectedItems.length; h++) {
					if (l === undefined) {
						l = "(materialGroup4 eq " + "'" + this.MatGrp4FromSelectedItems[h] + "'"
					} else {
						if (h === this.MatGrp4FromSelectedItems.length - 1) {
							l = l + " " + "or" + " " + "materialGroup4 eq " + "'" + this.MatGrp4FromSelectedItems[h] + "')"
						} else {
							l = l + " " + "or" + " " + "materialGroup4 eq " + "'" + this.MatGrp4FromSelectedItems[h] + "'"
						}
					}
				}
				if (t.length === 92) {
					t = t + l
				} else {
					t = t + " " + "and" + " " + l
				}
			}
			if (this.selectedMatFromItems.length === 0) {} else if (this.selectedMatFromItems.length === 1) {
				if (this.selectedMatToItems.length === 1) {
					i = "( materialNum ge " + "'" + this.selectedMatFromItems[0] + "'" + " and " + "materialNum le " + "'" + this.selectedMatToItems[
						0] + "' )"
				} else {
					i = "materialNum eq " + "'" + this.selectedMatFromItems[0] + "'"
				}
				if (t.length === 92) {
					t = t + i
				} else {
					t = t + " " + "and" + " " + i
				}
			} else if (this.selectedMatFromItems.length > 1) {
				for (var h = 0; h < this.selectedMatFromItems.length; h++) {
					if (i === undefined) {
						i = "(materialNum eq " + "'" + this.selectedMatFromItems[h] + "'"
					} else {
						if (h === this.selectedMatFromItems.length - 1) {
							i = i + " " + "or" + " " + "materialNum eq " + "'" + this.selectedMatFromItems[h] + "')"
						} else {
							i = i + " " + "or" + " " + "materialNum eq " + "'" + this.selectedMatFromItems[h] + "'"
						}
					}
				}
				if (t.length === 92) {
					t = t + i
				} else {
					t = t + " " + "and" + " " + i
				}
			}
			if (this.selectedVendorMatFrom.length === 0) {} else if (this.selectedVendorMatFrom.length === 1) {
				if (this.selectedVendorMatTo.length === 1) {
					n = "( vendorMaterial ge " + "'" + this.selectedVendorMatFrom[0] + "'" + " and " + "vendorMaterial le " + "'" + this.selectedVendorMatTo[
						0] + "' )"
				} else {
					n = "vendorMaterial eq " + "'" + this.selectedVendorMatFrom[0] + "'"
				}
				if (t.length === 92) {
					t = t + n
				} else {
					t = t + " " + "and" + " " + n
				}
			} else if (this.selectedVendorMatFrom.length > 1) {
				for (var h = 0; h < this.selectedVendorMatFrom.length; h++) {
					if (n === undefined) {
						n = "(vendorMaterial eq " + "'" + this.selectedVendorMatFrom[h] + "'"
					} else {
						if (h === this.selectedVendorMatFrom.length - 1) {
							n = n + " " + "or" + " " + "vendorMaterial eq " + "'" + this.selectedVendorMatFrom[h] + "')"
						} else {
							n = n + " " + "or" + " " + "vendorMaterial eq " + "'" + this.selectedVendorMatFrom[h] + "'"
						}
					}
				}
				if (t.length === 92) {
					t = t + n
				} else {
					t = t + " " + "and" + " " + n
				}
			}
			if (this.exFdaStock !== "" && this.exFdaStock !== undefined) {
				if (t.length === 92) {
					t = t + this.exFdaStock
				} else {
					t = t + " " + "and" + " " + this.exFdaStock
				}
			}
			if (this.serialNo !== "" && this.serialNo !== undefined) {
				if (t.length === 92) {
					t = t + this.serialNo
				} else {
					t = t + " " + "and" + " " + this.serialNo
				}
			}
			if (this.salesUnit !== "" && this.salesUnit !== undefined) {
				if (t.length === 92) {
					t = t + this.salesUnit
				} else {
					t = t + " " + "and" + " " + this.salesUnit
				}
			}
			if (this.baseUnit !== "" && this.baseUnit !== undefined) {
				if (t.length === 92) {
					t = t + this.baseUnit
				} else {
					t = t + " " + "and" + " " + this.baseUnit
				}
			}
			if (this.Unrestricted !== "" && this.Unrestricted !== undefined) {
				if (t.length === 92) {
					t = t + this.Unrestricted
				} else {
					t = t + " " + "and" + " " + this.Unrestricted
				}
			}
			if (this.inspection !== "" && this.inspection !== undefined) {
				if (t.length === 92) {
					t = t + this.inspection
				} else {
					t = t + " " + "and" + " " + this.inspection
				}
			}
			if (this.blocked !== "" && this.blocked !== undefined) {
				if (t.length === 92) {
					t = t + this.blocked
				} else {
					t = t + " " + "and" + " " + this.blocked
				}
			}
			var p = this.getView().getModel("ZDKSH_CC_INVENTORY_ENQUIRIES_SRV");
			t = t + "&$format=json";
			var c = new sap.m.BusyDialog;
			c.open();
			$.ajax({
				url: t,
				method: "GET",
				async: true,
				success: function (t, s, r) {
					c.close();
					var a = new sap.ui.model.json.JSONModel({
						results: t.d.results
					});
					a.setSizeLimit(a.getData().results.length);
					e.getView().setModel(a, "expiryStckTableModel");
					var o = "Expiry Stock" + "(" + t.d.results.length + ")";
					e.getView().getModel("expiryStckTableModel").setProperty("/dataLength", o);
					e.getView().getModel("expiryStckTableModel").refresh();
					e.getView().getModel("baseModel").setProperty("/SearchVisiblity", false);
					e.getView().getModel("baseModel").setProperty("/CollapseVisiblity", false);
					e.getView().getModel("baseModel").setProperty("/openVisiblity", true);
					e.getView().getModel("baseModel").refresh()
				},
				error: function (t, s, r) {
					c.close();
					var a = new sap.ui.model.json.JSONModel({
						results: ""
					});
					e.getView().setModel(a, "expiryStckTableModel");
					e.getView().getModel("expiryStckTableModel").setProperty("/dataLength", "");
					e.getView().getModel("expiryStckTableModel").refresh();
					var o = "";
					if (t.status === 504) {
						o = "Request timed-out. Please try again using different search filters or add more search filters.";
						e.errorMsg(o)
					} else {
						o = t.responseJSON.error.message.value;
						e.errorMsg(o)
					}
				}
			})
		},
		onSearchExpiryStock: function (e) {
			if (e.getParameters().newValue === undefined) {
				var t = e.getParameters().query
			} else {
				var t = e.getParameters().newValue
			}
			var s = new Array;
			var r = new sap.ui.model.Filter([new sap.ui.model.Filter("materialNum", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter(
					"materialDesc", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter("storageLocation", sap.ui.model.FilterOperator
					.Contains, t), new sap.ui.model.Filter("rslDays", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter(
					"storageLocation", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter("expired6", sap.ui.model.FilterOperator.Contains,
					t), new sap.ui.model.Filter("materialGroup", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter("matGroupDesc",
					sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter("materialGroup4", sap.ui.model.FilterOperator.Contains, t),
				new sap.ui.model.Filter("matGroup4Desc", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter("vendorMat", sap.ui.model
					.FilterOperator.Contains, t), new sap.ui.model.Filter("batch", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter(
					"unit", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter("expired", sap.ui.model.FilterOperator.Contains, t),
				new sap.ui.model.Filter("expired3", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter("expired9", sap.ui.model.FilterOperator
					.Contains, t), new sap.ui.model.Filter("expired12", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter(
					"expired15", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter("expired18", sap.ui.model.FilterOperator.Contains,
					t), new sap.ui.model.Filter("serialNum", sap.ui.model.FilterOperator.Contains, t)
			]);
			s.push(r);
			var a = this.getView().byId("expiryStockTableId").getBinding("items");
			a.filter(s)
		},
		matMovSearch: function () {
			var e = this;
			var t = "/DKSHODataService/sap/opu/odata/sap/ZDKSH_CC_INVENTORY_ENQUIRIES_SRV/MaterialMovementSet?$filter=";
			var r;
			var a;
			var o;
			var l;
			var i;
			var n;
			var d;
			var h;
			var p;
			e._getPersonalizationDetails("keyMat.Movement.Ind")
			var c = this.getView().getModel("baseModel").getData();
			if (this.plantFromSelectedItems.length === 0) {
				s.error("Enter all the mandatory fields");
				return
			} else if (this.plantFromSelectedItems.length === 1) {
				c.EndingStckplantValueState = "None";
				r = "plant eq " + "'" + this.plantFromSelectedItems[0] + "'";
				if (t.length === 97) {
					t = t + r
				} else {
					t = t + " " + "and" + " " + r
				}
			} else if (this.plantFromSelectedItems.length > 1) {
				c.EndingStckplantValueState = "None";
				for (var g = 0; g < this.plantFromSelectedItems.length; g++) {
					if (r === undefined) {
						r = "(plant eq " + "'" + this.plantFromSelectedItems[g] + "'"
					} else {
						if (g === this.plantFromSelectedItems.length - 1) {
							r = r + " " + "or" + " " + "plant eq " + "'" + this.plantFromSelectedItems[g] + "')"
						} else {
							r = r + " " + "or" + " " + "plant eq " + "'" + this.plantFromSelectedItems[g] + "'"
						}
					}
				}
				if (t.length === 97) {
					t = t + r
				} else {
					t = t + " " + "and" + " " + r
				}
			}
			if (this.SLocFromSelectedItems.length === 0) {} else if (this.SLocFromSelectedItems.length === 1) {
				c.EndingStckSLocValueState = "None";
				if (this.SLocToSelectedItems.length === 1) {
					a = "( storageLocation ge " + "'" + this.SLocFromSelectedItems[0] + "'" + " and " + "storageLocation le " + "'" + this.SLocToSelectedItems[
						0] + "' )"
				} else {
					a = "storageLocation eq " + "'" + this.SLocFromSelectedItems[0] + "'"
				}
				if (t.length === 97) {
					t = t + a
				} else {
					t = t + " " + "and" + " " + a
				}
			} else if (this.SLocFromSelectedItems.length > 1) {
				c.EndingStckSLocValueState = "None";
				for (var g = 0; g < this.SLocFromSelectedItems.length; g++) {
					if (a === undefined) {
						a = "(storageLocation eq " + "'" + this.SLocFromSelectedItems[g] + "'"
					} else {
						if (g === this.SLocFromSelectedItems.length - 1) {
							a = a + " " + "or" + " " + "storageLocation eq " + "'" + this.SLocFromSelectedItems[g] + "')"
						} else {
							a = a + " " + "or" + " " + "storageLocation eq " + "'" + this.SLocFromSelectedItems[g] + "'"
						}
					}
				}
				if (t.length === 97) {
					t = t + a
				} else {
					t = t + " " + "and" + " " + a
				}
			}
			if (this.MatGrpFromSelectedItems.length === 0) {
				s.error("Enter all the mandatory fields");
				return
			} else if (this.MatGrpFromSelectedItems.length === 1) {
				c.matGrpValueState = "None";
				if (this.MatGrpToSelectedItems.length === 1) {
					o = "( materialGroup ge " + "'" + this.MatGrpFromSelectedItems[0] + "'" + " and " + "materialGroup le " + "'" + this.MatGrpToSelectedItems[
						0] + "' )"
				} else {
					o = "materialGroup eq " + "'" + this.MatGrpFromSelectedItems[0] + "'"
				}
				if (t.length === 97) {
					t = t + o
				} else {
					t = t + " " + "and" + " " + o
				}
			} else if (this.MatGrpFromSelectedItems.length > 1) {
				c.matGrpValueState = "None";
				for (var g = 0; g < this.MatGrpFromSelectedItems.length; g++) {
					if (o === undefined) {
						o = "(materialGroup eq " + "'" + this.MatGrpFromSelectedItems[g] + "'"
					} else {
						if (g === this.MatGrpFromSelectedItems.length - 1) {
							o = o + " " + "or" + " " + "materialGroup eq " + "'" + this.MatGrpFromSelectedItems[g] + "')"
						} else {
							o = o + " " + "or" + " " + "materialGroup eq " + "'" + this.MatGrpFromSelectedItems[g] + "'"
						}
					}
				}
				if (t.length === 97) {
					t = t + o
				} else {
					t = t + " " + "and" + " " + o
				}
			}
			if (this.MatGrp4FromSelectedItems.length === 0) {
				if (e.materialGroup4DataAccess !== undefined && e.materialGroup4DataAccess !== "") {
					l = "materialGroup4 eq " + "('" + e.materialGroup4DataAccess + "')";
					if (t.length === 97) {
						t = t + l
					} else {
						t = t + " " + "and" + " " + l
					}
				}
			} else if (this.MatGrp4FromSelectedItems.length === 1) {
				if (this.MatGrp4ToSelectedItems.length === 1) {
					l = "( materialGroup4 ge " + "'" + this.MatGrp4FromSelectedItems[0] + "'" + " and " + "materialGroup4 le " + "'" + this.MatGrp4ToSelectedItems[
						0] + "' )"
				} else {
					l = "materialGroup4 eq " + "'" + this.MatGrp4FromSelectedItems[0] + "'"
				}
				if (t.length === 97) {
					t = t + l
				} else {
					t = t + " " + "and" + " " + l
				}
			} else if (this.MatGrp4FromSelectedItems.length > 1) {
				for (var g = 0; g < this.MatGrp4FromSelectedItems.length; g++) {
					if (l === undefined) {
						l = "(materialGroup4 eq " + "'" + this.MatGrp4FromSelectedItems[g] + "'"
					} else {
						if (g === this.MatGrp4FromSelectedItems.length - 1) {
							l = l + " " + "or" + " " + "materialGroup4 eq " + "'" + this.MatGrp4FromSelectedItems[g] + "')"
						} else {
							l = l + " " + "or" + " " + "materialGroup4 eq " + "'" + this.MatGrp4FromSelectedItems[g] + "'"
						}
					}
				}
				if (t.length === 97) {
					t = t + l
				} else {
					t = t + " " + "and" + " " + l
				}
			}
			if (this.selectedMatFromItems.length === 0) {} else if (this.selectedMatFromItems.length === 1) {
				if (this.selectedMatToItems.length === 1) {
					i = "( materialNum ge " + "'" + this.selectedMatFromItems[0] + "'" + " and " + "materialNum le " + "'" + this.selectedMatToItems[
						0] + "' )"
				} else {
					i = "materialNum eq " + "'" + this.selectedMatFromItems[0] + "'"
				}
				if (t.length === 97) {
					t = t + i
				} else {
					t = t + " " + "and" + " " + i
				}
			} else if (this.selectedMatFromItems.length > 1) {
				for (var g = 0; g < this.selectedMatFromItems.length; g++) {
					if (i === undefined) {
						i = "(materialNum eq " + "'" + this.selectedMatFromItems[g] + "'"
					} else {
						if (g === this.selectedMatFromItems.length - 1) {
							i = i + " " + "or" + " " + "materialNum eq " + "'" + this.selectedMatFromItems[g] + "')"
						} else {
							i = i + " " + "or" + " " + "materialNum eq " + "'" + this.selectedMatFromItems[g] + "'"
						}
					}
				}
				if (t.length === 97) {
					t = t + i
				} else {
					t = t + " " + "and" + " " + i
				}
			}
			if (this.postingDateFrom !== undefined && this.postingDateFrom !== "") {
				if (this.postingDateTo === undefined || this.postingDateTo === "") {
					if (t.length === 97) {
						t = t + "postingDate eq datetime" + "'" + this.postingDateFrom + "'"
					} else {
						t = t + " " + "and" + " " + "postingDate eq datetime" + "'" + this.postingDateFrom + "'"
					}
				} else {
					if (t.length === 97) {
						t = t + "( postingDate ge datetime" + "'" + this.postingDateFrom + "'" + " and " + "postingDate le datetime" + "'" + this.postingDateTo +
							"' )"
					} else {
						t = t + " " + "and" + " " + "( postingDate ge datetime" + "'" + this.postingDateFrom + "'" + " and " + "postingDate le datetime" +
							"'" + this.postingDateTo + "' )"
					}
				}
			} else {
				s.error("Enter all mandatory fields");
				return
			}
			if (this.selectedVendorMatFrom.length === 0) {} else if (this.selectedVendorMatFrom.length === 1) {
				if (this.selectedVendorMatTo.length === 1) {
					n = "( vendorMaterial ge " + "'" + this.selectedVendorMatFrom[0] + "'" + " and " + "vendorMaterial le " + "'" + this.selectedVendorMatTo[
						0] + "' )"
				} else {
					n = "vendorMaterial eq " + "'" + this.selectedVendorMatFrom[0] + "'"
				}
				if (t.length === 97) {
					t = t + n
				} else {
					t = t + " " + "and" + " " + n
				}
			} else if (this.selectedVendorMatFrom.length > 1) {
				for (var g = 0; g < this.selectedVendorMatFrom.length; g++) {
					if (n === undefined) {
						n = "(vendorMaterial eq " + "'" + this.selectedVendorMatFrom[g] + "'"
					} else {
						if (g === this.selectedVendorMatFrom.length - 1) {
							n = n + " " + "or" + " " + "vendorMaterial eq " + "'" + this.selectedVendorMatFrom[g] + "')"
						} else {
							n = n + " " + "or" + " " + "vendorMaterial eq " + "'" + this.selectedVendorMatFrom[g] + "'"
						}
					}
				}
				if (t.length === 97) {
					t = t + n
				} else {
					t = t + " " + "and" + " " + n
				}
			}
			this.selectedMovType;
			if (this.selectedMovType === undefined || this.selectedMovType.length === 0) {} else if (this.selectedMovType.length === 1) {
				p = "movementType eq " + "'" + this.selectedMovType[0] + "'";
				if (t.length === 97) {
					t = t + p
				} else {
					t = t + " " + "and" + " " + p
				}
			} else if (this.selectedMovType.length > 1) {
				for (var g = 0; g < this.selectedMovType.length; g++) {
					if (p === undefined) {
						p = "(movementType eq " + "'" + this.selectedMovType[g] + "'"
					} else {
						if (g === this.selectedMovType.length - 1) {
							p = p + " " + "or" + " " + "movementType eq " + "'" + this.selectedMovType[g] + "')"
						} else {
							p = p + " " + "or" + " " + "movementType eq " + "'" + this.selectedMovType[g] + "'"
						}
					}
				}
				if (t.length === 97) {
					t = t + p
				} else {
					t = t + " " + "and" + " " + p
				}
			}
			if (this.selectedBatch.length === 0) {} else if (this.selectedBatch.length === 1) {
				d = "batchNumber eq " + "'" + this.selectedBatch[0] + "'";
				if (t.length === 97) {
					t = t + d
				} else {
					t = t + " " + "and" + " " + d
				}
			} else if (this.selectedBatch.length > 1) {
				for (var g = 0; g < this.selectedBatch.length; g++) {
					if (d === undefined) {
						d = "(batchNumber eq " + "'" + this.selectedBatch[g] + "'"
					} else {
						if (g === this.selectedBatch.length - 1) {
							d = d + " " + "or" + " " + "batchNumber eq " + "'" + this.selectedBatch[g] + "')"
						} else {
							d = d + " " + "or" + " " + "batchNumber eq " + "'" + this.selectedBatch[g] + "'"
						}
					}
				}
				if (t.length === 97) {
					t = t + d
				} else {
					t = t + " " + "and" + " " + d
				}
			}
			if (this.selectedMatDocItems.length === 0) {} else if (this.selectedMatDocItems.length === 1) {
				h = "materialDocument eq " + "'" + this.selectedMatDocItems[0] + "'";
				if (t.length === 97) {
					t = t + h
				} else {
					t = t + " " + "and" + " " + h
				}
			} else if (this.selectedMatDocItems.length > 1) {
				for (var g = 0; g < this.selectedMatDocItems.length; g++) {
					if (h === undefined) {
						h = "(materialDocument eq " + "'" + this.selectedMatDocItems[g] + "'"
					} else {
						if (g === this.selectedMatDocItems.length - 1) {
							h = h + " " + "or" + " " + "materialDocument eq " + "'" + this.selectedMatDocItems[g] + "')"
						} else {
							h = h + " " + "or" + " " + "materialDocument eq " + "'" + this.selectedMatDocItems[g] + "'"
						}
					}
				}
				if (t.length === 97) {
					t = t + h
				} else {
					t = t + " " + "and" + " " + h
				}
			}
			if (this.serialNo !== "" && this.serialNo !== undefined) {
				if (t.length === 97) {
					t = t + this.serialNo
				} else {
					t = t + " " + "and" + " " + this.serialNo
				}
			}
			var m = this.getView().getModel("ZDKSH_CC_INVENTORY_ENQUIRIES_SRV");
			t = t + "&$format=json";
			var u = new sap.m.BusyDialog;
			u.open();
			$.ajax({
				url: t,
				method: "GET",
				async: true,
				success: function (t, s, r) {
					u.close();
					var a = new sap.ui.model.json.JSONModel({
						results: t.d.results
					});
					a.setSizeLimit(a.getData().results.length);
					e.getView().setModel(a, "mavMovTableModel");
					var o = "Material Movement" + "(" + t.d.results.length + ")";
					e.getView().getModel("mavMovTableModel").setProperty("/dataLength", o);
					e.getView().getModel("mavMovTableModel").refresh();
					e.getView().getModel("baseModel").setProperty("/SearchVisiblity", false);
					e.getView().getModel("baseModel").setProperty("/CollapseVisiblity", false);
					e.getView().getModel("baseModel").setProperty("/openVisiblity", true);
					e.getView().getModel("baseModel").refresh()
				},
				error: function (t, s, r) {
					u.close();
					var a = new sap.ui.model.json.JSONModel({
						results: ""
					});
					e.getView().setModel(a, "mavMovTableModel");
					e.getView().getModel("mavMovTableModel").setProperty("/dataLength", "");
					e.getView().getModel("mavMovTableModel").refresh();
					var o = "";
					if (t.status === 504) {
						o = "Request timed-out. Please try again using different search filters or add more search filters.";
						e.errorMsg(o)
					} else {
						o = t.responseJSON.error.message.value;
						e.errorMsg(o)
					}
				}
			})
		},
		onSearchMatMov: function (e) {
			if (e.getParameters().newValue === undefined) {
				var t = e.getParameters().query
			} else {
				var t = e.getParameters().newValue
			}
			var s = new Array;
			var r = new sap.ui.model.Filter([new sap.ui.model.Filter("materialNum", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter(
					"materialDesc", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter("materialDocument", sap.ui.model.FilterOperator
					.Contains, t), new sap.ui.model.Filter("batchNumber", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter(
					"quantity", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter("saleUnit", sap.ui.model.FilterOperator.Contains,
					t), new sap.ui.model.Filter("movementType", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter("textStockType",
					sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter("headerNote", sap.ui.model.FilterOperator.Contains, t), new sap
				.ui.model.Filter("splStockIndicator", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter("bigQuantity", sap.ui.model
					.FilterOperator.Contains, t), new sap.ui.model.Filter("baseUnit", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter(
					"materialGroup", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter("materialGroupDesc", sap.ui.model.FilterOperator
					.Contains, t), new sap.ui.model.Filter("materialGroup4", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter(
					"materialGroup4Desc", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model.Filter("vendorMaterial", sap.ui.model.FilterOperator
					.Contains, t), new sap.ui.model.Filter("serialNo", sap.ui.model.FilterOperator.Contains, t)
			]);
			s.push(r);
			var a = this.getView().byId("matMovTableId").getBinding("items");
			a.filter(s)
		},
		popOver: function (e) {
			var t = e.getSource();
			if (!this._oPopover) {
				r.load({
					name: "dksh.connectclient.InventoryMatManagement.Fragments.popoverTable",
					controller: this
				}).then(function (e) {
					this._oPopover = e;
					this.getView().addDependent(this._oPopover);
					this._oPopover.bindElement("");
					if (sap.ui.Device.system.phone === true) {
						this._oPopover.setPlacement("Bottom");
						this._oPopover.openBy(t)
					} else {
						this._oPopover.openBy(t)
					}
				}.bind(this))
			} else {
				if (sap.ui.Device.system.phone === true) {
					this._oPopover.setPlacement("Bottom");
					this._oPopover.openBy(t)
				} else {
					this._oPopover.openBy(t)
				}
			}
		},
		onExit: function () {
			if (this._oPopover) {
				this._oPopover.destroy()
			}
		},
		closePopover: function () {
			this._oPopover.close()
		},
		navigateStkLot: function (e) {
			if (sap.ui.Device.system.phone === true) {
				var t = e.getSource().getBindingContext("stockLotModel").getObject();
				var s = e.getSource();
				if (!this._oPopover) {
					r.load({
						name: "dksh.connectclient.InventoryMatManagement.Fragments.StockLotPopover",
						controller: this
					}).then(function (e) {
						this._oPopover = e;
						this.getView().addDependent(this._oPopover);
						var r = new sap.ui.model.json.JSONModel({
							results: t
						});
						this._oPopover.setModel(r, "StkLotPopoverModel");
						this._oPopover.getModel("StkLotPopoverModel").refresh();
						this._oPopover.setModel(this.getView().getModel("PersonalizationModel"), "PersonalizationModel");
						this._oPopover.getModel("PersonalizationModel").refresh();
						if (sap.ui.Device.system.phone === true) {
							this._oPopover.setPlacement("Bottom");
							this._oPopover.openBy(s)
						} else {
							this._oPopover.openBy(s)
						}
					}.bind(this))
				} else {
					var a = new sap.ui.model.json.JSONModel({
						results: t
					});
					this._oPopover.setModel(a, "StkLotPopoverModel");
					this._oPopover.getModel("StkLotPopoverModel").refresh();
					this._oPopover.setModel(this.getView().getModel("PersonalizationModel"), "PersonalizationModel");
					this._oPopover.getModel("PersonalizationModel").refresh();
					if (sap.ui.Device.system.phone === true) {
						this._oPopover.setPlacement("Bottom");
						this._oPopover.openBy(s)
					} else {
						this._oPopover.openBy(s)
					}
				}
			}
		},
		onChangeBatchStkLot: function (e) {
			var t = this.byId(this._getId("BatchFrom"));
			if (this.selectedBatchStkLot.length === 0) {
				this.selectedBatchStkLot.push(e.getParameters().value);
				t.addToken(new l({
					text: e.getParameters().value
				}))
			} else {
				if (this.selectedBatchStkLot.includes(e.getParameters().value) === false) {
					this.selectedBatchStkLot.push(e.getParameters().value);
					t.addToken(new l({
						text: e.getParameters().value
					}))
				}
			}
			e.getSource().setValue("")
		},
		onDeleteBatchStkLot: function (e) {
			var t = this.byId(this._getId("BatchFrom"));
			t.destroyTokens();
			var s = e.getParameters().removedTokens[0].mProperties.text;
			if (e.getParameters().type === "removed") {
				for (var r = this.selectedBatchStkLot.length; r >= 0; r--) {
					if (s === this.selectedBatchStkLot[r]) {
						this.selectedBatchStkLot.splice(r, 1)
					}
				}
				if (this.selectedBatchStkLot.length > 0) {
					for (var a = 0; a < this.selectedBatchStkLot.length; a++) {
						t.addToken(new l({
							text: this.selectedBatchStkLot[a]
						}))
					}
				}
			} else {
				this.selectedBatchStkLot.push(e.getParameters().addedTokens[0].getText())
			}
		},
		onChangeOnlyUnrestStkLot: function (e) {
			var t = e.getParameters().selected;
			if (t === true) {
				this.onlyUnrestricted = "onlyUnrestricted eq " + "'X'"
			} else {
				this.onlyUnrestricted = undefined
			}
		},
		onChangeBatchLevelStkLot: function (e) {
			var t = e.getParameters().selected;
			if (t === true) {
				this.BatchNum = "batchNum  eq " + "'X'"
			} else {
				this.BatchNum = undefined
			}
		},
		createColumnConfigStkLot: function () {
			return [{
				label: "Material",
				property: "materialNum"
			}, {
				label: "Material Description",
				property: "materialDesc"
			}, {
				label: "Vendor Mat",
				property: "vendorMatNum"
			}, {
				label: "Sales UOM",
				property: "salesUOM"
			}, {
				label: "On Hand",
				property: "onHandQty"
			}, {
				label: "Unrest. Stock",
				property: "unrestrictedStock"
			}, {
				label: "Inspec Stock",
				property: "stockInspection"
			}, {
				label: "LTP",
				property: "ltp"
			}, {
				label: "On Order",
				property: "onOrderQty"
			}, {
				label: "Available",
				property: "availQty"
			}, {
				label: "Blocked Stock",
				property: "blockedStock"
			}, {
				label: "Principal",
				property: "principalMatGroup"
			}, {
				label: "Material Group4",
				property: "materialGroup4"
			}, {
				label: "Batch Num",
				property: "batchNum"
			}, {
				label: "Created On",
				property: "createdOn"
			}, {
				label: "Manu. Date",
				property: "manufDate"
			}, {
				label: "Shelf life Exp",
				property: "shelfLifeDate"
			}, {
				label: "Batch Quantity",
				property: "batchQty"
			}, {
				label: "SLoc",
				property: "storageLocation"
			}, {
				label: "Reserved By",
				property: "reservedby"
			}, {
				label: "Valuated Unrestricted-Use Stock",
				property: "qtyUnrestrictedStock"
			}, {
				label: "Block Stock",
				property: "blockStock"
			}, {
				label: "Stock In Quality Inspection",
				property: "stockInspection"
			}]
		},
		onExportStockLot: function () {
			var e = [];
			var t = this.getView().getModel("stockLotModel").getData().results;
			for (var s = 0; s < t.length; s++) {
				t[s].shelfLifeDate = o.date(t[s].shelfLifeDate);
				t[s].manufDate = o.date(t[s].manufDate);
				t[s].createdOn = o.date(t[s].createdOn)
			}
			this._onExport(t, this.createColumnConfigStkLot())
		},
		filterSTkLot: function (e) {
			var t = this;
			if (e.getParameters().newValue === undefined) {
				var s = e.getParameters().query
			} else {
				var s = e.getParameters().newValue
			}
			var r = [];
			var a = new sap.ui.model.Filter([new sap.ui.model.Filter("materialNum", sap.ui.model.FilterOperator.Contains, s), new sap.ui.model.Filter(
					"vendorMatNum", sap.ui.model.FilterOperator.Contains, s), new sap.ui.model.Filter("onHandQty", sap.ui.model.FilterOperator.Contains,
					s), new sap.ui.model.Filter("unrestrictedStock", sap.ui.model.FilterOperator.Contains, s), new sap.ui.model.Filter("ltp", sap.ui
					.model.FilterOperator.Contains, s), new sap.ui.model.Filter("onOrderQty", sap.ui.model.FilterOperator.Contains, s), new sap.ui.model
				.Filter("availQty", sap.ui.model.FilterOperator.Contains, s), new sap.ui.model.Filter("blockedStock", sap.ui.model.FilterOperator
					.Contains, s), new sap.ui.model.Filter("principalMatGroup", sap.ui.model.FilterOperator.Contains, s), new sap.ui.model.Filter(
					"materialGroup4", sap.ui.model.FilterOperator.Contains, s), new sap.ui.model.Filter("serialNum", sap.ui.model.FilterOperator.Contains,
					s)
			]);
			r.push(a);
			var o = this.getView().byId("idOutputRes").getBinding("items");
			o.filter(r)
		},
		valueHelpRequestSalesOrg: function (e) {
			this.salesOrgPlaceholder = e.getSource().getPlaceholder();
			var t = this;
			if (t.salesOrgDataAccess === "No Access") {
				a.show("NO DATA ACCESS!")
			} else {
				if (!t.salesOrg) {
					t.salesOrg = sap.ui.xmlfragment("dksh.connectclient.InventoryMatManagement.Fragments.SalesOrg", t);
					t.getView().addDependent(t.salesOrg);
					var s = this.getView().getModel("ZDKSH_CC_INVENTORY_HDRLOOKUP_SRV");
					var r = [];
					var o = "";
					if (sap.ushell) {
						if (sap.ui.getCore().getConfiguration().getLanguage() === "th") {
							o = "2"
						} else {
							o = "EN"
						}
					} else {
						o = "EN"
					}
					o = o.toUpperCase();
					var l = new sap.ui.model.Filter({
						filters: [new sap.ui.model.Filter("Language", sap.ui.model.FilterOperator.EQ, o), new sap.ui.model.Filter("Salesorg", sap.ui.model
							.FilterOperator.EQ, t.salesOrgDataAccess)],
						and: true
					});
					r.push(l);
					var i = new sap.m.BusyDialog;
					i.open();
					s.read("/ZSearchHelp_SalesOrgSet", {
						async: false,
						filters: r,
						success: function (e, s) {
							i.close();
							var r = new sap.ui.model.json.JSONModel({
								results: e.results
							});
							t.salesOrg.setModel(r, "salesOrgModel");
							t.salesOrg.open()
						},
						error: function (e) {
							i.close();
							var s = "";
							if (e.statusCode === 504) {
								s = "Request timed-out. Please try again!";
								t.errorMsg(s)
							} else {
								s = JSON.parse(e.responseText);
								s = s.error.message.value;
								t.errorMsg(s)
							}
						}
					})
				} else {
					t.salesOrg.open()
				}
			}
		},
		onDeleteStockLotPlant: function (e) {
			var t = e.getSource().getPlaceholder();
			if (t === "To") {
				var s = this.byId(this._getId("PlantTo"));
				s.destroyTokens();
				this.plantToSelectedItems.splice(0, 1)
			} else {
				if (e.getParameters().type === "removed") {
					var s = this.byId(this._getId("PlantFrom"));
					s.destroyTokens();
					this.plant = undefined;
					var r = e.getParameters().removedTokens[0].mProperties.text;
					for (var a = this.plantFromSelectedItems.length; a >= 0; a--) {
						if (r === this.plantFromSelectedItems[a]) {
							this.plantFromSelectedItems.splice(a, 1)
						}
					}
					if (this.plantFromSelectedItems.length > 0) {
						for (var o = 0; o < this.plantFromSelectedItems.length; o++) {
							s.addToken(new l({
								text: this.plantFromSelectedItems[o]
							}));
							if (this.plantFromSelectedItems.length === 1) {
								this.getView().getModel("baseModel").setProperty("/enablePlantTo", true);
								this.getView().getModel("baseModel").refresh()
							} else {
								this.getView().getModel("baseModel").setProperty("/enablePlantTo", false);
								this.getView().getModel("baseModel").refresh()
							}
						}
					}
				} else {
					this.plantFromSelectedItems.push(e.getParameters().addedTokens[0].getText())
				}
			}
		},
		onLiveChangesalesOrg: function (e) {
			var t = e.getParameters().value;
			var s = new Array;
			var r = new sap.ui.model.Filter([new sap.ui.model.Filter("SalesorgDesc", sap.ui.model.FilterOperator.Contains, t), new sap.ui.model
				.Filter("Salesorg", sap.ui.model.FilterOperator.Contains, t)
			]);
			s.push(r);
			var a = e.getSource().getBinding("items");
			a.filter(s)
		},
		StockLotSearch: function () {
			var e = this;
			var t = "/DKSHODataService/sap/opu/odata/sap/ZDKSH_CC_INVENTORY_ENQUIRIES_SRV/StockLot_InputSet?$filter=";
			var r;
			var a;
			var o;
			var l;
			var i;
			var n;
			var d;
			var h = this.getView().getModel("baseModel").getData();
			var p;
			if (this.plantFromSelectedItems.length === 0) {
				s.error("Fill all mandatory fields");
				return
			} else if (this.plantFromSelectedItems.length === 1) {
				if (this.plantToSelectedItems.length === 1) {
					a = "( plant  ge " + "'" + this.plantFromSelectedItems[0] + "'" + " and " + "plant  le " + "'" + this.plantToSelectedItems[0] +
						"' )"
				} else {
					a = "plant  eq " + "'" + this.plantFromSelectedItems[0] + "'"
				}
				if (t.length === 95) {
					t = t + a
				} else {
					t = t + " " + "and" + " " + a
				}
			} else if (this.plantFromSelectedItems.length > 1) {
				for (var c = 0; c < this.plantFromSelectedItems.length; c++) {
					if (a === undefined) {
						a = "(plant eq " + "'" + this.plantFromSelectedItems[c] + "'"
					} else {
						if (c === this.plantFromSelectedItems.length - 1) {
							a = a + " " + "or" + " " + "plant eq " + "'" + this.plantFromSelectedItems[c] + "')"
						} else {
							a = a + " " + "or" + " " + "plant eq " + "'" + this.plantFromSelectedItems[c] + "'"
						}
					}
				}
				if (t.length === 95) {
					t = t + a
				} else {
					t = t + " " + "and" + " " + a
				}
			}
			
			// SalesOrgFromSelectedItems
			// salesOrgFromSelectedItems
			if (this.SalesOrgFromSelectedItems.length === 0) {
				s.error("Fill all mandatory fields");
				return
			} else if (this.SalesOrgFromSelectedItems.length === 1) {
				if (this.SalesOrgFromSelectedItems.length === 1) {
					r = "( salesOrg   ge " + "'" + this.SalesOrgFromSelectedItems[0] + "'" + " and " + "salesOrg   le " + "'" + this.salesOrgToSelectedItems[
						0] + "' )"
				} else {
					r = "salesOrg   eq " + "'" + this.SalesOrgFromSelectedItems[0] + "'"
				}
				if (t.length === 95) {
					t = t + r
				} else {
					t = t + " " + "and" + " " + r
				}
			} else if (this.SalesOrgFromSelectedItems.length > 1) {
				for (var c = 0; c < this.SalesOrgFromSelectedItems.length; c++) {
					if (r === undefined) {
						r = "(salesOrg eq " + "'" + this.SalesOrgFromSelectedItems[c] + "'"
					} else {
						if (c === this.SalesOrgFromSelectedItems.length - 1) {
							r = r + " " + "or" + " " + "salesOrg eq " + "'" + this.SalesOrgFromSelectedItems[c] + "')"
						} else {
							r = r + " " + "or" + " " + "salesOrg eq " + "'" + this.SalesOrgFromSelectedItems[c] + "'"
						}
					}
				}
				if (t.length === 95) {
					t = t + r
				} else {
					t = t + " " + "and" + " " + r
				}
			}
			
			
			if (this.SLocFromSelectedItems.length === 0) {
				o = "storageLocation eq " + "'" + this.SLOCDataAccess + "'";
				if (t.length === 95) {
					t = t + o
				} else {
					t = t + " " + "and" + " " + o
				}
			} else if (this.SLocFromSelectedItems.length === 1) {
				if (this.SLocToSelectedItems.length === 1) {
					o = "( storageLocation ge " + "'" + this.SLocFromSelectedItems[0] + "'" + " and " + "storageLocation le " + "'" + this.SLocToSelectedItems[
						0] + "' )"
				} else {
					o = "storageLocation eq " + "'" + this.SLocFromSelectedItems[0] + "'"
				}
				if (t.length === 95) {
					t = t + o
				} else {
					t = t + " " + "and" + " " + o
				}
			} else if (this.SLocFromSelectedItems.length > 1) {
				for (var c = 0; c < this.SLocFromSelectedItems.length; c++) {
					if (o === undefined) {
						o = "(storageLocation eq " + "'" + this.SLocFromSelectedItems[c] + "'"
					} else {
						if (c === this.SLocFromSelectedItems.length - 1) {
							o = o + " " + "or" + " " + "storageLocation eq " + "'" + this.SLocFromSelectedItems[c] + "')"
						} else {
							o = o + " " + "or" + " " + "storageLocation eq " + "'" + this.SLocFromSelectedItems[c] + "'"
						}
					}
				}
				if (t.length === 95) {
					t = t + o
				} else {
					t = t + " " + "and" + " " + o
				}
			}
			if (this.MatGrpFromSelectedItems.length === 0) {
				s.error("Enter all mandatory fields");
				return
			} else if (this.MatGrpFromSelectedItems.length === 1) {
				if (this.MatGrpToSelectedItems.length === 1) {
					l = "( materialGroup ge " + "'" + this.MatGrpFromSelectedItems[0] + "'" + " and " + "materialGroup le " + "'" + this.MatGrpToSelectedItems[
						0] + "' )"
				} else {
					l = "materialGroup eq " + "'" + this.MatGrpFromSelectedItems[0] + "'"
				}
				if (t.length === 95) {
					t = t + l
				} else {
					t = t + " " + "and" + " " + l
				}
			} else if (this.MatGrpFromSelectedItems.length > 1) {
				for (var c = 0; c < this.MatGrpFromSelectedItems.length; c++) {
					if (l === undefined) {
						l = " " + "(materialGroup eq " + "'" + this.MatGrpFromSelectedItems[c] + "'"
					} else {
						if (c === this.MatGrpFromSelectedItems.length - 1) {
							l = l + " " + "or" + " " + "materialGroup eq " + "'" + this.MatGrpFromSelectedItems[c] + "')"
						} else {
							l = l + " " + "or" + " " + "materialGroup eq " + "'" + this.MatGrpFromSelectedItems[c] + "'"
						}
					}
				}
				if (t.length === 95) {
					t = t + l
				} else {
					t = t + " " + "and" + " " + l
				}
			}
			if (this.MatGrp4FromSelectedItems.length === 0) {
				i = "materialGroup4 eq " + "('" + e.materialGroup4DataAccess + "')";
				if (t.length === 95) {
					t = t + i
				} else {
					t = t + " " + "and" + " " + i
				}
			} else if (this.MatGrp4FromSelectedItems.length === 1) {
				if (this.MatGrp4ToSelectedItems.length === 1) {
					i = "( materialGroup4 ge " + "'" + this.MatGrp4FromSelectedItems[0] + "'" + " and " + "materialGroup4 le " + "'" + this.MatGrp4ToSelectedItems[
						0] + "' )"
				} else {
					i = "materialGroup4 eq " + "'" + this.MatGrp4FromSelectedItems[0] + "'"
				}
				if (t.length === 95) {
					t = t + i
				} else {
					t = t + " " + "and" + " " + i
				}
			} else if (this.MatGrp4FromSelectedItems.length > 1) {
				for (var c = 0; c < this.MatGrp4FromSelectedItems.length; c++) {
					if (i === undefined) {
						i = " " + "(materialGroup4 eq " + "'" + this.MatGrp4FromSelectedItems[c] + "'"
					} else {
						if (c === this.MatGrp4FromSelectedItems.length - 1) {
							i = i + " " + "or" + " " + "materialGroup4 eq " + "'" + this.MatGrp4FromSelectedItems[c] + "')"
						} else {
							i = i + " " + "or" + " " + "materialGroup4 eq " + "'" + this.MatGrp4FromSelectedItems[c] + "'"
						}
					}
				}
				if (t.length === 95) {
					t = t + i
				} else {
					t = t + " " + "and" + " " + i
				}
			}
			if (this.selectedMatFromItems.length === 0) {} else if (this.selectedMatFromItems.length === 1) {
				if (this.selectedMatToItems.length === 1) {
					n = "( materialNum ge " + "'" + this.selectedMatFromItems[0] + "'" + " and " + "materialNum le " + "'" + this.selectedMatToItems[
						0] + "' )"
				} else {
					n = "materialNum eq " + "'" + this.selectedMatFromItems[0] + "'"
				}
				if (t.length === 95) {
					t = t + n
				} else {
					t = t + " " + "and" + " " + n
				}
			} else if (this.selectedMatFromItems.length > 1) {
				for (var c = 0; c < this.selectedMatFromItems.length; c++) {
					if (n === undefined) {
						n = " " + "(materialNum eq " + "'" + this.selectedMatFromItems[c] + "'"
					} else {
						if (c === this.selectedMatFromItems.length - 1) {
							n = n + " " + "or" + " " + "materialNum eq " + "'" + this.selectedMatFromItems[c] + "')"
						} else {
							n = n + " " + "or" + " " + "materialNum eq " + "'" + this.selectedMatFromItems[c] + "'"
						}
					}
				}
				if (t.length === 95) {
					t = t + n
				} else {
					t = t + " " + "and" + " " + n
				}
			}
			if (this.selectedVendorMatFrom.length === 0) {} else if (this.selectedVendorMatFrom.length === 1) {
				if (this.selectedVendorMatTo.length === 1) {
					p = "( vendorMaterial ge " + "'" + this.selectedVendorMatFrom[0] + "'" + " and " + "vendorMaterial le " + "'" + this.selectedVendorMatTo[
						0] + "' )"
				} else {
					p = "vendorMaterial eq " + "'" + this.selectedVendorMatFrom[0] + "'"
				}
				if (t.length === 95) {
					t = t + p
				} else {
					t = t + " " + "and" + " " + p
				}
			} else if (this.selectedVendorMatFrom.length > 1) {
				for (var c = 0; c < this.selectedVendorMatFrom.length; c++) {
					if (p === undefined) {
						p = "(vendorMaterial eq " + "'" + this.selectedVendorMatFrom[c] + "'"
					} else {
						if (c === this.selectedVendorMatFrom.length - 1) {
							p = p + " " + "or" + " " + "vendorMaterial eq " + "'" + this.selectedVendorMatFrom[c] + "')"
						} else {
							p = p + " " + "or" + " " + "vendorMaterial eq " + "'" + this.selectedVendorMatFrom[c] + "'"
						}
					}
				}
				if (t.length === 95) {
					t = t + p
				} else {
					t = t + " " + "and" + " " + p
				}
			}
			if (this.BatchNum !== "" && this.BatchNum !== undefined) {
				if (t.length === 95) {
					t = t + this.BatchNum
				} else {
					t = t + " " + "and" + " " + this.BatchNum
				}
			}
			if (this.RawMat !== "" && this.RawMat !== undefined) {
				if (t.length === 95) {
					t = t + this.RawMat
				} else {
					t = t + " " + "and" + " " + this.RawMat
				}
			}
			if (this.showQty !== "" && this.showQty !== undefined) {
				if (t.length === 95) {
					t = t + this.showQty
				} else {
					t = t + " " + "and" + " " + this.showQty
				}
			}
			if (this.SalesMat !== "" && this.SalesMat !== undefined) {
				if (t.length === 95) {
					t = t + this.SalesMat
				} else {
					t = t + " " + "and" + " " + this.SalesMat
				}
			}
			if (this.ZeroStk !== "" && this.ZeroStk !== undefined) {
				if (t.length === 95) {
					t = t + this.ZeroStk
				} else {
					t = t + " " + "and" + " " + this.ZeroStk
				}
			}
			if (this.onlyUnrestricted !== "" && this.onlyUnrestricted !== undefined) {
				if (t.length === 95) {
					t = t + this.onlyUnrestricted
				} else {
					t = t + " " + "and" + " " + this.onlyUnrestricted
				}
			}
			if (this.onlyChBufferStk !== "" && this.onlyChBufferStk !== undefined) {
				if (t.length === 95) {
					t = t + this.onlyChBufferStk
				} else {
					t = t + " " + "and" + " " + this.onlyChBufferStk
				}
			}
			if (this.onlyShowSalesUQ !== "" && this.onlyShowSalesUQ !== undefined) {
				if (t.length === 95) {
					t = t + this.onlyShowSalesUQ
				} else {
					t = t + " " + "and" + " " + this.onlyShowSalesUQ
				}
			}
			if (this.onlyQI !== "" && this.onlyQI !== undefined) {
				if (t.length === 95) {
					t = t + this.onlyQI
				} else {
					t = t + " " + "and" + " " + this.onlyQI
				}
			}
			if (this.onlyShowAllStk !== "" && this.onlyShowAllStk !== undefined) {
				if (t.length === 95) {
					t = t + this.onlyShowAllStk
				} else {
					t = t + " " + "and" + " " + this.onlyShowAllStk
				}
			}
			if (this.serialNo !== "" && this.serialNo !== undefined) {
				if (t.length === 95) {
					t = t + this.serialNo
				} else {
					t = t + " " + "and" + " " + this.serialNo
				}
			}
			if (this.expiryDateFrom !== undefined && this.expiryDateFrom !== "") {
				if (this.expiryDateTo === undefined || this.expiryDateTo === "") {
					if (t.length === 95) {
						t = t + "expiredDate eq datetime" + "'" + this.expiryDateFrom + "'"
					} else {
						t = t + " " + "and" + " " + "expiredDate eq datetime" + "'" + this.expiryDateFrom + "'"
					}
				} else {
					if (t.length === 95) {
						t = t + "( expiredDate ge datetime" + "'" + this.expiryDateFrom + "'" + " and " + "expiredDate le datetime" + "'" + this.expiryDateTo +
							"' )"
					} else {
						t = t + " " + "and" + " " + "( expiredDate ge datetime" + "'" + this.expiryDateFrom + "'" + " and " + "expiredDate le datetime" +
							"'" + this.expiryDateTo + "' )"
					}
				}
			}
			var g = this.getView().getModel("ZDKSH_CC_INVENTORY_ENQUIRIES_SRV");
			t = t + "&$expand=InputToOutput/OutputToBatchOutput" + "&$format=json";
			var m = new sap.m.BusyDialog;
			m.open();
			$.ajax({
				url: t,
				method: "GET",
				async: true,
				success: function (t, s, r) {
					m.close();
					var a = new sap.ui.model.json.JSONModel({
						results: t.d.results[0].InputToOutput.results
					});
					a.setSizeLimit(1e3);
					e.getView().setModel(a, "stockLotModel");
					var o = "Stock and Lot Control List" + "(" + t.d.results[0].InputToOutput.results.length + ")";
					for (var l = 0; l < t.d.results[0].InputToOutput.results.length; l++) {
						if (t.d.results[0].InputToOutput.results[l].OutputToBatchOutput.results.length > 10) {
							e.getView().getModel("baseModel").setProperty("/invoiceTableLength", "60vh")
						} else {
							e.getView().getModel("baseModel").setProperty("/invoiceTableLength", "")
						}
					}
					e.getView().getModel("stockLotModel").setProperty("/dataLength", o);
					e.getView().getModel("stockLotModel").refresh();
					e.getView().getModel("baseModel").setProperty("/SearchVisiblity", false);
					e.getView().getModel("baseModel").setProperty("/CollapseVisiblity", false);
					e.getView().getModel("baseModel").setProperty("/openVisiblity", true);
					e.getView().getModel("baseModel").refresh()
				},
				error: function (t, s, r) {
					m.close();
					var a = new sap.ui.model.json.JSONModel({
						results: ""
					});
					e.getView().setModel(a, "stockLotModel");
					e.getView().getModel("stockLotModel").setProperty("/dataLength", "");
					e.getView().getModel("stockLotModel").refresh();
					var o = "";
					if (t.status === 504) {
						o = "Request timed-out. Please try again using different search filters or add more search filters.";
						e.errorMsg(o)
					} else {
						o = t.responseJSON.error.message.value;
						e.errorMsg(o)
					}
				}
			})
		},
		onDeleteStockLotPlant: function (e) {
			var t = e.getSource().getPlaceholder();
			if (t === "To") {
				var s = this.byId(this._getId("PlantTo"));
				s.destroyTokens();
				this.plantToSelectedItems.splice(0, 1)
			} else {
				if (e.getParameters().type === "removed") {
					var s = this.byId(this._getId("PlantFrom"));
					s.destroyTokens();
					this.plant = undefined;
					var r = e.getParameters().removedTokens[0].mProperties.text;
					for (var a = this.plantFromSelectedItems.length; a >= 0; a--) {
						if (r === this.plantFromSelectedItems[a]) {
							this.plantFromSelectedItems.splice(a, 1)
						}
					}
					if (this.plantFromSelectedItems.length > 0) {
						for (var o = 0; o < this.plantFromSelectedItems.length; o++) {
							s.addToken(new l({
								text: this.plantFromSelectedItems[o]
							}));
							if (this.plantFromSelectedItems.length === 1) {
								this.getView().getModel("baseModel").setProperty("/enablePlantTo", true);
								this.getView().getModel("baseModel").refresh()
							} else {
								this.getView().getModel("baseModel").setProperty("/enablePlantTo", false);
								this.getView().getModel("baseModel").refresh()
							}
						}
					}
				} else {
					this.plantFromSelectedItems.push(e.getParameters().addedTokens[0].getText())
				}
			}
		}
	})
});