/**
 * Created by qbl on 2015/11/18.
 */
require(['app'],function(app){
    app.constant('homeNewUrl','/loocha/menu/main/0?article_limit=999&menu_limit=999')
    app.constant('exampleNewUrl','/loocha/menu/main/13?article_limit=999&menu_limit=999')
    app.constant('onlineUrl','/loocha/menu/main/93?article_limit=999&menu_limit=999')
    app.constant('cityNewUrl','/loocha/menu/main/18?article_limit=999&menu_limit=999')
    app.constant('schoolNewUrl','/loocha/menu/main/19?article_limit=999&menu_limit=999')
    app.constant('majorNewUrl','/loocha/menu/main/20?article_limit=999&menu_limit=999')
    app.constant('recipeNewUrl','/loocha/menu/main/15?article_limit=999&menu_limit=999')
    app.constant('scoreNewUrl','/loocha/menu/main/16?article_limit=999&menu_limit=999')
    app.constant('policyNewUrl','/loocha/menu/main/17?article_limit=999&menu_limit=999')
    app.constant('jobNewUrl','/loocha/menu/main/21?article_limit=999&menu_limit=999')
    app.constant('uniqueNewUrl','/loocha/menu/main/22?article_limit=999&menu_limit=999')
    app.controller('LhomeNewCtl',['$scope','$rootScope','$sce','$http','AJAX','homeNewUrl','homeService',function($scope,$rootScope,$sce,$http,AJAX,homeNewUrl,homeService){
        $scope.news = "";
        $scope.homeService = homeService;
        $scope.isShow = true;
        $http.get(homeNewUrl).success(function(data){
            $scope.news = data.response.left;
        });

        $scope.info = function(id){
            $http.get('/loocha/article/show/'+id).success(function(data){
                $scope.isShow = false;
                $scope.homeService.htmlPage=data;
            });
        };
    }]);
    app.controller('RhomeNewCtl',['$scope','$sce','$http','AJAX','homeNewUrl','homeService',function($scope,$sce,$http,AJAX,homeNewUrl,homeService){
        $scope.news = "";
        $scope.homeService = homeService;
        $http.get(homeNewUrl).success(function(data){
            $scope.news = data.response.right;
        });
        $scope.info = function(id){
            $http.get('/loocha/article/show/'+id).success(function(data){
                $scope.homeService.htmlPage=data;
            });
        }
    }])
    app.controller('LexampleNewCtl',['$scope','$sce','$http','AJAX','exampleNewUrl','homeService',function($scope,$sce,$http,AJAX,exampleNewUrl,homeService){
        $scope.news = "";
        $scope.homeService = homeService;
        $http.get(exampleNewUrl).success(function(data){
            $scope.news = data.response.left;
        });
        $scope.info = function(id){
            $http.get('/loocha/article/show/'+id).success(function(data){
                $scope.homeService.htmlPage=data;
            });
        }
    }])
    app.controller('RexampleNewCtl',['$scope','$sce','$http','AJAX','exampleNewUrl','homeService',function($scope,$sce,$http,AJAX,exampleNewUrl,homeService){
        $scope.news = "";
        $scope.homeService = homeService;
        $http.get(exampleNewUrl).success(function(data){
            $scope.news = data.response.right;
        });
        $scope.info = function(id){
            $http.get('/loocha/article/show/'+id).success(function(data){
                $scope.homeService.htmlPage=data;
            });
        }
    }])
    app.controller('LonlineNewCtl',['$scope','$sce','$http','AJAX','onlineUrl','homeService',function($scope,$sce,$http,AJAX,onlineUrl,homeService){
        $scope.news = "";
        $scope.homeService = homeService;
        $http.get(onlineUrl).success(function(data){
            $scope.news = data.response.left;
        });
        $scope.info = function(id){
            $http.get('/loocha/article/show/'+id).success(function(data){
                $scope.homeService.htmlPage=data;
            });
        }
    }])
    app.controller('RonlineNewCtl',['$scope','$sce','$http','AJAX','onlineUrl','homeService',function($scope,$sce,$http,AJAX,onlineUrl,homeService){
        $scope.news = "";
        $scope.homeService = homeService;
        $http.get(onlineUrl).success(function(data){
            $scope.news = data.response.right;
        });
        $scope.info = function(id){
            $http.get('/loocha/article/show/'+id).success(function(data){
                $scope.homeService.htmlPage=data;
            });
        }
    }])
    app.controller('LcityNewCtl',['$scope','$sce','$http','AJAX','cityNewUrl','homeService',function($scope,$sce,$http,AJAX,cityNewUrl,homeService){
        $scope.news = "";
        $scope.homeService = homeService;
        $http.get(cityNewUrl).success(function(data){
            $scope.news = data.response.left;
        });
        $scope.info = function(id){
            $http.get('/loocha/article/show/'+id).success(function(data){
                $scope.homeService.htmlPage=data;
            });
        }
    }])
    app.controller('RcityNewCtl',['$scope','$sce','$http','AJAX','cityNewUrl','homeService',function($scope,$sce,$http,AJAX,cityNewUrl,homeService){
        $scope.news = "";
        $scope.homeService = homeService;
        $http.get(cityNewUrl).success(function(data){
            $scope.news = data.response.right;
        });
        $scope.info = function(id){
            $http.get('/loocha/article/show/'+id).success(function(data){
                $scope.homeService.htmlPage=data;
            });
        }
    }])
    app.controller('LschoolNewCtl',['$scope','$sce','$http','AJAX','schoolNewUrl','homeService',function($scope,$sce,$http,AJAX,schoolNewUrl,homeService){
        $scope.news = "";
        $scope.homeService = homeService;
        $http.get(schoolNewUrl).success(function(data){
            $scope.news = data.response.left;
        });
        $scope.info = function(id){
            $http.get('/loocha/article/show/'+id).success(function(data){
                $scope.homeService.htmlPage=data;
            });
        }
    }])
    app.controller('RschoolNewCtl',['$scope','$sce','$http','AJAX','schoolNewUrl','homeService',function($scope,$sce,$http,AJAX,schoolNewUrl,homeService){
        $scope.news = "";
        $scope.homeService = homeService;
        $http.get(schoolNewUrl).success(function(data){
            $scope.news = data.response.right;
        });
        $scope.info = function(id){
            $http.get('/loocha/article/show/'+id).success(function(data){
                $scope.homeService.htmlPage=data;
            });
        }
    }])
    app.controller('LmarjorNewCtl',['$scope','$sce','$http','AJAX','majorNewUrl','homeService',function($scope,$sce,$http,AJAX,majorNewUrl,homeService){
        $scope.news = "";
        $scope.homeService = homeService;
        $http.get(majorNewUrl).success(function(data){
            $scope.news = data.response.left;
        });
        $scope.info = function(id){
            $http.get('/loocha/article/show/'+id).success(function(data){
                $scope.homeService.htmlPage=data;
            });
        }
    }])
    app.controller('RmarjorNewCtl',['$scope','$sce','$http','AJAX','majorNewUrl','homeService',function($scope,$sce,$http,AJAX,majorNewUrl,homeService){
        $scope.news = "";
        $scope.homeService = homeService;
        $http.get(majorNewUrl).success(function(data){
            $scope.news = data.response.right;
        });
        $scope.info = function(id){
            $http.get('/loocha/article/show/'+id).success(function(data){
                $scope.homeService.htmlPage=data;
            });
        }
    }])
    app.controller('LrecipeNewCtl',['$scope','$sce','$http','AJAX','recipeNewUrl','homeService',function($scope,$sce,$http,AJAX,recipeNewUrl,homeService){
        $scope.news = "";
        $scope.homeService = homeService;
        $http.get(recipeNewUrl).success(function(data){
            $scope.news = data.response.left;
        });
        $scope.info = function(id){
            $http.get('/loocha/article/show/'+id).success(function(data){
                $scope.homeService.htmlPage=data;
            });
        }
    }])
    app.controller('RrecipeNewCtl',['$scope','$sce','$http','AJAX','recipeNewUrl','homeService',function($scope,$sce,$http,AJAX,recipeNewUrl,homeService){
        $scope.news = "";
        $scope.homeService = homeService;
        $http.get(recipeNewUrl).success(function(data){
            $scope.news = data.response.right;
        });
        $scope.info = function(id){
            $http.get('/loocha/article/show/'+id).success(function(data){
                $scope.homeService.htmlPage=data;
            });
        }
    }])
    app.controller('LscoreNewCtl',['$scope','$sce','$http','AJAX','scoreNewUrl','homeService',function($scope,$sce,$http,AJAX,scoreNewUrl,homeService){
        $scope.news = "";
        $scope.homeService = homeService;
        $http.get(scoreNewUrl).success(function(data){
            $scope.news = data.response.left;
        });
        $scope.info = function(id){
            $http.get('/loocha/article/show/'+id).success(function(data){
                $scope.homeService.htmlPage=data;
            });
        }
    }])
    app.controller('RscoreNewCtl',['$scope','$sce','$http','AJAX','scoreNewUrl','homeService',function($scope,$sce,$http,AJAX,scoreNewUrl,homeService){
        $scope.news = "";
        $scope.homeService = homeService;
        $http.get(scoreNewUrl).success(function(data){
            $scope.news = data.response.right;
        });
        $scope.info = function(id){
            $http.get('/loocha/article/show/'+id).success(function(data){
                $scope.homeService.htmlPage=data;
            });
        }
    }])
    app.controller('LpolicyNewCtl',['$scope','$sce','$http','AJAX','policyNewUrl','homeService',function($scope,$sce,$http,AJAX,policyNewUrl,homeService){
        $scope.news = "";
        $scope.homeService = homeService;
        $http.get(policyNewUrl).success(function(data){
            $scope.news = data.response.left;
        });
        $scope.info = function(id){
            $http.get('/loocha/article/show/'+id).success(function(data){
                $scope.homeService.htmlPage=data;
            });
        }
    }])
    app.controller('RpolicyNewCtl',['$scope','$sce','$http','AJAX','policyNewUrl','homeService',function($scope,$sce,$http,AJAX,policyNewUrl,homeService){
        $scope.news = "";
        $scope.homeService = homeService;
        $http.get(policyNewUrl).success(function(data){
            $scope.news = data.response.right;
        });
        $scope.info = function(id){
            $http.get('/loocha/article/show/'+id).success(function(data){
                $scope.homeService.htmlPage=data;
            });
        }
    }])
    app.controller('LjobNewCtl',['$scope','$sce','$http','AJAX','jobNewUrl','homeService',function($scope,$sce,$http,AJAX,jobNewUrl,homeService){
        $scope.news = "";
        $scope.homeService = homeService;
        $http.get(jobNewUrl).success(function(data){
            $scope.news = data.response.left;
        });
        $scope.info = function(id){
            $http.get('/loocha/article/show/'+id).success(function(data){
                $scope.homeService.htmlPage=data;
            });
        }
    }])
    app.controller('RjobNewCtl',['$scope','$sce','$http','AJAX','jobNewUrl','homeService',function($scope,$sce,$http,AJAX,jobNewUrl,homeService){
        $scope.news = "";
        $scope.homeService = homeService;
        $http.get(jobNewUrl).success(function(data){
            $scope.news = data.response.right;
        });
        $scope.info = function(id){
            $http.get('/loocha/article/show/'+id).success(function(data){
                $scope.homeService.htmlPage=data;
            });
        }
    }])
    app.controller('LuniqueNewCtl',['$scope','$sce','$http','AJAX','uniqueNewUrl','homeService',function($scope,$sce,$http,AJAX,uniqueNewUrl,homeService){
        $scope.news = "";
        $scope.homeService = homeService;
        $http.get(uniqueNewUrl).success(function(data){
            $scope.news = data.response.left;
        });
        $scope.info = function(id){
            $http.get('/loocha/article/show/'+id).success(function(data){
                $scope.homeService.htmlPage=data;
            });
        }
    }])
    app.controller('RuniqueNewCtl',['$scope','$sce','$http','AJAX','uniqueNewUrl','homeService',function($scope,$sce,$http,AJAX,uniqueNewUrl,homeService){
        $scope.news = "";
        $scope.homeService = homeService;
        $http.get(uniqueNewUrl).success(function(data){
            $scope.news = data.response.right;
        });
        $scope.info = function(id){
            $http.get('/loocha/article/show/'+id).success(function(data){
                $scope.homeService.htmlPage=data;
            });
        }
    }])
});
