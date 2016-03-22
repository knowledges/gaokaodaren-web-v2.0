/**
 * Created by qbl on 2015/11/18.
 */
require(['app'],function(app){
    app.constant('homeNewUrl','/menu/main/0?article_limit=999&menu_limit=999');
    app.constant('exampleNewUrl','/menu/main/13?article_limit=999&menu_limit=999');
    app.constant('onlineUrl','/menu/main/93?article_limit=999&menu_limit=999');
    app.constant('cityNewUrl','/menu/main/18?article_limit=999&menu_limit=999');
    app.constant('schoolNewUrl','/menu/main/19?article_limit=999&menu_limit=999');
    app.constant('majorNewUrl','/menu/main/20?article_limit=999&menu_limit=999');
    app.constant('recipeNewUrl','/menu/main/15?article_limit=999&menu_limit=999');
    app.constant('scoreNewUrl','/menu/main/16?article_limit=999&menu_limit=999');
    app.constant('policyNewUrl','/menu/main/17?article_limit=999&menu_limit=999');
    app.constant('jobNewUrl','/menu/main/21?article_limit=999&menu_limit=999');
    app.constant('uniqueNewUrl','/menu/main/22?article_limit=999&menu_limit=999');
    app.controller('LhomeNewCtl',['$scope','$rootScope','$sce','$http','loocha','homeNewUrl','homeService',function($scope,$rootScope,$sce,$http,loocha,homeNewUrl,homeService){
        $scope.news = "";
        $scope.homeService = homeService;
        $scope.isShow = true;
        $http.get(loocha+homeNewUrl).success(function(data){
            $scope.news = data.response.left;
        });

        $scope.info = function(id){
            $http.get(loocha+'/article/show/'+id).success(function(data){
                $scope.isShow = false;
                $scope.homeService.htmlPage=data;
            });
        };
    }]);
    app.controller('RhomeNewCtl',['$scope','$sce','$http','loocha','homeNewUrl','homeService',function($scope,$sce,$http,loocha,homeNewUrl,homeService){
        $scope.news = "";
        $scope.homeService = homeService;
        $http.get(loocha+homeNewUrl).success(function(data){
            $scope.news = data.response.right;
        });
        $scope.info = function(id){
            $http.get(loocha+'/article/show/'+id).success(function(data){
                $scope.homeService.htmlPage=data;
            });
        }
    }]);
    app.controller('LexampleNewCtl',['$scope','$sce','$http','loocha','exampleNewUrl','homeService',function($scope,$sce,$http,loocha,exampleNewUrl,homeService){
        $scope.news = "";
        $scope.homeService = homeService;
        $http.get(loocha+exampleNewUrl).success(function(data){
            $scope.news = data.response.left;
        });
        $scope.info = function(id){
            $http.get(loocha+'/article/show/'+id).success(function(data){
                $scope.homeService.htmlPage=data;
            });
        }
    }]);
    app.controller('RexampleNewCtl',['$scope','$sce','$http','loocha','exampleNewUrl','homeService',function($scope,$sce,$http,loocha,exampleNewUrl,homeService){
        $scope.news = "";
        $scope.homeService = homeService;
        $http.get(loocha+exampleNewUrl).success(function(data){
            $scope.news = data.response.right;
        });
        $scope.info = function(id){
            $http.get(loocha+'/article/show/'+id).success(function(data){
                $scope.homeService.htmlPage=data;
            });
        }
    }]);
    app.controller('LonlineNewCtl',['$scope','$sce','$http','loocha','onlineUrl','homeService',function($scope,$sce,$http,loocha,onlineUrl,homeService){
        $scope.news = "";
        $scope.homeService = homeService;
        $http.get(loocha+onlineUrl).success(function(data){
            $scope.news = data.response.left;
        });
        $scope.info = function(id){
            $http.get(loocha+'/article/show/'+id).success(function(data){
                $scope.homeService.htmlPage=data;
            });
        }
    }]);
    app.controller('RonlineNewCtl',['$scope','$sce','$http','loocha','onlineUrl','homeService',function($scope,$sce,$http,loocha,onlineUrl,homeService){
        $scope.news = "";
        $scope.homeService = homeService;
        $http.get(loocha+onlineUrl).success(function(data){
            $scope.news = data.response.right;
        });
        $scope.info = function(id){
            $http.get(loocha+'/article/show/'+id).success(function(data){
                $scope.homeService.htmlPage=data;
            });
        }
    }]);
    app.controller('LcityNewCtl',['$scope','$sce','$http','loocha','cityNewUrl','homeService',function($scope,$sce,$http,loocha,cityNewUrl,homeService){
        $scope.news = "";
        $scope.homeService = homeService;
        $http.get(loocha+cityNewUrl).success(function(data){
            $scope.news = data.response.left;
        });
        $scope.info = function(id){
            $http.get(loocha+'/article/show/'+id).success(function(data){
                $scope.homeService.htmlPage=data;
            });
        }
    }]);
    app.controller('RcityNewCtl',['$scope','$sce','$http','loocha','cityNewUrl','homeService',function($scope,$sce,$http,loocha,cityNewUrl,homeService){
        $scope.news = "";
        $scope.homeService = homeService;
        $http.get(loocha+cityNewUrl).success(function(data){
            $scope.news = data.response.right;
        });
        $scope.info = function(id){
            $http.get(loocha+'/article/show/'+id).success(function(data){
                $scope.homeService.htmlPage=data;
            });
        }
    }])
    app.controller('LschoolNewCtl',['$scope','$sce','$http','loocha','schoolNewUrl','homeService',function($scope,$sce,$http,loocha,schoolNewUrl,homeService){
        $scope.news = "";
        $scope.homeService = homeService;
        $http.get(loocha+schoolNewUrl).success(function(data){
            $scope.news = data.response.left;
        });
        $scope.info = function(id){
            $http.get(loocha+'/article/show/'+id).success(function(data){
                $scope.homeService.htmlPage=data;
            });
        }
    }]);
    app.controller('RschoolNewCtl',['$scope','$sce','$http','loocha','schoolNewUrl','homeService',function($scope,$sce,$http,loocha,schoolNewUrl,homeService){
        $scope.news = "";
        $scope.homeService = homeService;
        $http.get(loocha+schoolNewUrl).success(function(data){
            $scope.news = data.response.right;
        });
        $scope.info = function(id){
            $http.get(loocha+'/article/show/'+id).success(function(data){
                $scope.homeService.htmlPage=data;
            });
        }
    }]);
    app.controller('LmarjorNewCtl',['$scope','$sce','$http','loocha','majorNewUrl','homeService',function($scope,$sce,$http,loocha,majorNewUrl,homeService){
        $scope.news = "";
        $scope.homeService = homeService;
        $http.get(loocha+majorNewUrl).success(function(data){
            $scope.news = data.response.left;
        });
        $scope.info = function(id){
            $http.get(loocha+'/article/show/'+id).success(function(data){
                $scope.homeService.htmlPage=data;
            });
        }
    }]);
    app.controller('RmarjorNewCtl',['$scope','$sce','$http','loocha','majorNewUrl','homeService',function($scope,$sce,$http,loocha,majorNewUrl,homeService){
        $scope.news = "";
        $scope.homeService = homeService;
        $http.get(loocha+majorNewUrl).success(function(data){
            $scope.news = data.response.right;
        });
        $scope.info = function(id){
            $http.get(loocha+'/article/show/'+id).success(function(data){
                $scope.homeService.htmlPage=data;
            });
        }
    }]);
    app.controller('LrecipeNewCtl',['$scope','$sce','$http','loocha','recipeNewUrl','homeService',function($scope,$sce,$http,loocha,recipeNewUrl,homeService){
        $scope.news = "";
        $scope.homeService = homeService;
        $http.get(loocha+recipeNewUrl).success(function(data){
            $scope.news = data.response.left;
        });
        $scope.info = function(id){
            $http.get(loocha+'/article/show/'+id).success(function(data){
                $scope.homeService.htmlPage=data;
            });
        }
    }]);
    app.controller('RrecipeNewCtl',['$scope','$sce','$http','loocha','recipeNewUrl','homeService',function($scope,$sce,$http,loocha,recipeNewUrl,homeService){
        $scope.news = "";
        $scope.homeService = homeService;
        $http.get(loocha+recipeNewUrl).success(function(data){
            $scope.news = data.response.right;
        });
        $scope.info = function(id){
            $http.get(loocha+'/article/show/'+id).success(function(data){
                $scope.homeService.htmlPage=data;
            });
        }
    }]);
    app.controller('LscoreNewCtl',['$scope','$sce','$http','loocha','scoreNewUrl','homeService',function($scope,$sce,$http,loocha,scoreNewUrl,homeService){
        $scope.news = "";
        $scope.homeService = homeService;
        $http.get(loocha+scoreNewUrl).success(function(data){
            $scope.news = data.response.left;
        });
        $scope.info = function(id){
            $http.get(loocha+'/article/show/'+id).success(function(data){
                $scope.homeService.htmlPage=data;
            });
        }
    }]);
    app.controller('RscoreNewCtl',['$scope','$sce','$http','loocha','scoreNewUrl','homeService',function($scope,$sce,$http,loocha,scoreNewUrl,homeService){
        $scope.news = "";
        $scope.homeService = homeService;
        $http.get(loocha+scoreNewUrl).success(function(data){
            $scope.news = data.response.right;
        });
        $scope.info = function(id){
            $http.get(loocha+'/article/show/'+id).success(function(data){
                $scope.homeService.htmlPage=data;
            });
        }
    }]);
    app.controller('LpolicyNewCtl',['$scope','$sce','$http','loocha','policyNewUrl','homeService',function($scope,$sce,$http,loocha,policyNewUrl,homeService){
        $scope.news = "";
        $scope.homeService = homeService;
        $http.get(loocha+policyNewUrl).success(function(data){
            $scope.news = data.response.left;
        });
        $scope.info = function(id){
            $http.get(loocha+'/article/show/'+id).success(function(data){
                $scope.homeService.htmlPage=data;
            });
        }
    }]);
    app.controller('RpolicyNewCtl',['$scope','$sce','$http','loocha','policyNewUrl','homeService',function($scope,$sce,$http,loocha,policyNewUrl,homeService){
        $scope.news = "";
        $scope.homeService = homeService;
        $http.get(loocha+policyNewUrl).success(function(data){
            $scope.news = data.response.right;
        });
        $scope.info = function(id){
            $http.get(loocha+'/article/show/'+id).success(function(data){
                $scope.homeService.htmlPage=data;
            });
        }
    }]);
    app.controller('LjobNewCtl',['$scope','$sce','$http','loocha','jobNewUrl','homeService',function($scope,$sce,$http,loocha,jobNewUrl,homeService){
        $scope.news = "";
        $scope.homeService = homeService;
        $http.get(loocha+jobNewUrl).success(function(data){
            $scope.news = data.response.left;
        });
        $scope.info = function(id){
            $http.get(loocha+'/article/show/'+id).success(function(data){
                $scope.homeService.htmlPage=data;
            });
        }
    }]);
    app.controller('RjobNewCtl',['$scope','$sce','$http','loocha','jobNewUrl','homeService',function($scope,$sce,$http,loocha,jobNewUrl,homeService){
        $scope.news = "";
        $scope.homeService = homeService;
        $http.get(loocha+jobNewUrl).success(function(data){
            $scope.news = data.response.right;
        });
        $scope.info = function(id){
            $http.get(loocha+'/article/show/'+id).success(function(data){
                $scope.homeService.htmlPage=data;
            });
        }
    }]);
    app.controller('LuniqueNewCtl',['$scope','$sce','$http','loocha','uniqueNewUrl','homeService',function($scope,$sce,$http,loocha,uniqueNewUrl,homeService){
        $scope.news = "";
        $scope.homeService = homeService;
        $http.get(loocha+uniqueNewUrl).success(function(data){
            $scope.news = data.response.left;
        });
        $scope.info = function(id){
            $http.get(loocha+'/article/show/'+id).success(function(data){
                $scope.homeService.htmlPage=data;
            });
        }
    }]);
    app.controller('RuniqueNewCtl',['$scope','$sce','$http','loocha','uniqueNewUrl','homeService',function($scope,$sce,$http,loocha,uniqueNewUrl,homeService){
        $scope.news = "";
        $scope.homeService = homeService;
        $http.get(loocha+uniqueNewUrl).success(function(data){
            $scope.news = data.response.right;
        });
        $scope.info = function(id){
            $http.get(loocha+'/article/show/'+id).success(function(data){
                $scope.homeService.htmlPage=data;
            });
        }
    }])
});
