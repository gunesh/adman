App.controller('AdditiveManufacturing', ['$scope', '$http', function ($scope, $http) {
        $scope.init = function () {
            $scope.selectedIndustry = 0;
            $scope.selectedModel = 0;
            $scope.mainTab = 1;
        };
        $scope.setTabs = function (tab) {
            //$scope.tab = tab;
        };
        $scope.setMainTab = function (tab) {
            $scope.mainTab = tab;
            if (tab == 2) {
                $scope.tab = 1;
            }
        };
        $scope.setIndustry = function (ind) {
            $scope.selectedIndustry = ind.id;
            $scope.selectedModel = 0;
        };
        $scope.setModel = function (mod) {
            $scope.selectedModel = mod.id;
        };
        $scope.setNext = function () {
            var max = 6;
            if ($scope.tab == max) {
                return;
            }
            $scope.tab++;
        }
        $scope.setBack = function () {
            var min = 1;
            if ($scope.tab == min) {
                return;
            }
            $scope.tab--;
        }
        $http.get("data/IndustryModels.json")
                .success(function (response) {
                    $scope.industry = response.industry;
                    $scope.models = response.models;
                });
        $scope.init();
        $scope.printerStatusDetails =
                [
                    {
                        "id": "1",
                        "industry": "Automotive",
                        "modelname": "External Mirror",
                        "printername": "MakerBOT Germany",
                        "status": "Completed",
                        "dateadded": "15-Apr-16"
                    },
                    {
                        "id": "2",
                        "industry": "Automotive",
                        "modelname": "Gear Shift",
                        "printername": "MakerBOT Germany",
                        "status": "Completed",
                        "dateadded": "15-Apr-16"
                    },
                    {
                        "id": "3",
                        "industry": "Industrial Equipment",
                        "modelname": "Tooling",
                        "printername": "MakerBOT India",
                        "status": "Printing Initiated",
                        "dateadded": "16-Apr-16"
                    },
                    {
                        "id": "4",
                        "industry": "Energy-O&G",
                        "modelname": "Blade",
                        "printername": "MakerBOT",
                        "status": "Completed",
                        "dateadded": "10-Apr-16"
                    },
                    {
                        "id": "5",
                        "industry": "Aeronautics",
                        "modelname": "Seat Support",
                        "printername": "MakerBOT",
                        "status": "Printing Initiated",
                        "dateadded": "20-Apr-16"
                    }
                ];
    }]);
