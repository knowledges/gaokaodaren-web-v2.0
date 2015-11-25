/**
 * Created by qbl on 2015/11/18.
 */
angular.module('gaokaoApp.home.new',[])
.constant('homeNewUrl','/menu/main/0?article_limit=999&menu_limit=999')
.constant('exampleNewUrl','/menu/main/13?article_limit=999&menu_limit=999')
.constant('onlineUrl','/menu/main/93?article_limit=999&menu_limit=999')
.constant('cityNewUrl','/menu/main/18?article_limit=999&menu_limit=999')
.constant('schoolNewUrl','/menu/main/19?article_limit=999&menu_limit=999')
.constant('majorNewUrl','/menu/main/20?article_limit=999&menu_limit=999')
.constant('recipeNewUrl','/menu/main/15?article_limit=999&menu_limit=999')
.constant('scoreNewUrl','/menu/main/16?article_limit=999&menu_limit=999')
.constant('policyNewUrl','/menu/main/17?article_limit=999&menu_limit=999')
.constant('jobNewUrl','/menu/main/21?article_limit=999&menu_limit=999')
.constant('uniqueNewUrl','/menu/main/22?article_limit=999&menu_limit=999')
.controller('LhomeNewCtl',['$scope','$rootScope','$sce','AJAX','homeNewUrl','homeService',function($scope,$rootScope,$sce,AJAX,homeNewUrl,homeService){
        $scope.new = "";
        $scope.homeService = homeService;

        AJAX.getRequest(homeNewUrl,'GET','')
            .success(function(data){
                $scope.new = data.response.left;
            });

        $scope.info = function(id){
            AJAX.getRequest('/article/show/'+id,'GET','')
                .success(function(data,status){
                    $scope.homeService.htmlPage=data;
                });
        }
}])
.controller('RhomeNewCtl',['$scope','$sce','AJAX','homeNewUrl','homeService',function($scope,$sce,AJAX,homeNewUrl,homeService){
        $scope.new = "";
        $scope.homeService = homeService;
        AJAX.getRequest(homeNewUrl,'GET','')
            .success(function(data,status){
                $scope.new = data.response.right;
            });

        $scope.info = function(id){
            AJAX.getRequest('/article/show/'+id,'GET','')
                .success(function(data,status){
                    $scope.homeService.htmlPage=data;
                });
        }
}])
.controller('LexampleNewCtl',['$scope','$sce','AJAX','exampleNewUrl','homeService',function($scope,sce,AJAX,exampleNewUrl,homeService){
        $scope.new = "";
        $scope.homeService = homeService;
        AJAX.getRequest(exampleNewUrl,'GET','')
            .success(function(data,status){
                $scope.new = data.response.left;
            });
        $scope.info = function(id){
            AJAX.getRequest('/article/show/'+id,'GET','')
                .success(function(data,status){
                    $scope.homeService.htmlPage=data;
                });
        }
}])
.controller('RexampleNewCtl',['$scope','$sce','AJAX','exampleNewUrl','homeService',function($scope,sce,AJAX,exampleNewUrl,homeService){
        $scope.new = "";
        $scope.homeService = homeService;
        AJAX.getRequest(exampleNewUrl,'GET','')
            .success(function(data,status){
                $scope.new = data.response.right;
            });
        $scope.info = function(id){
            AJAX.getRequest('/article/show/'+id,'GET','')
                .success(function(data,status){
                    $scope.homeService.htmlPage=data;
                });
        }
}])
.controller('LonlineNewCtl',['$scope','$sce','AJAX','onlineUrl','homeService',function($scope,sce,AJAX,onlineUrl,homeService){
    $scope.new = "";
    $scope.homeService = homeService;
    AJAX.getRequest(onlineUrl,'GET','')
        .success(function(data,status){
            $scope.new = data.response.left;
        });
    $scope.info = function(id){
        AJAX.getRequest('/article/show/'+id,'GET','')
            .success(function(data,status){
                $scope.homeService.htmlPage=data;
            });
    }
}])
.controller('RonlineNewCtl',['$scope','$sce','AJAX','onlineUrl','homeService',function($scope,sce,AJAX,onlineUrl,homeService){
    $scope.new = "";
    $scope.homeService = homeService;
    AJAX.getRequest(onlineUrl,'GET','')
        .success(function(data,status){
            $scope.new = data.response.right;
        });
    $scope.info = function(id){
        AJAX.getRequest('/article/show/'+id,'GET','')
            .success(function(data,status){
                $scope.homeService.htmlPage=data;
            });
    }
}])
.controller('LcityNewCtl',['$scope','$sce','AJAX','cityNewUrl','homeService',function($scope,sce,AJAX,cityNewUrl,homeService){
    $scope.new = "";
    $scope.homeService = homeService;
    AJAX.getRequest(cityNewUrl,'GET','')
        .success(function(data,status){
            $scope.new = data.response.left;
        });
    $scope.info = function(id){
        console.log('id');
        AJAX.getRequest('/article/show/'+id,'GET','')
            .success(function(data,status){
                $scope.homeService.htmlPage=data;
            });
    }
}])
.controller('RcityNewCtl',['$scope','$sce','AJAX','cityNewUrl','homeService',function($scope,sce,AJAX,cityNewUrl,homeService){
    $scope.new = "";
    $scope.homeService = homeService;
    AJAX.getRequest(cityNewUrl,'GET','')
        .success(function(data,status){
            $scope.new = data.response.right;
        });
    $scope.info = function(id){
        AJAX.getRequest('/article/show/'+id,'GET','')
            .success(function(data,status){
                $scope.homeService.htmlPage=data;
            });
    }
}])
.controller('LschoolNewCtl',['$scope','$sce','AJAX','schoolNewUrl','homeService',function($scope,sce,AJAX,schoolNewUrl,homeService){
    $scope.new = "";
    $scope.homeService = homeService;
    AJAX.getRequest(schoolNewUrl,'GET','')
        .success(function(data,status){
            $scope.new = data.response.left;
        });
    $scope.info = function(id){
        AJAX.getRequest('/article/show/'+id,'GET','')
            .success(function(data,status){
                $scope.homeService.htmlPage=data;
            });
    }
}])
.controller('RschoolNewCtl',['$scope','$sce','AJAX','schoolNewUrl','homeService',function($scope,sce,AJAX,schoolNewUrl,homeService){
    $scope.new = "";
    $scope.homeService = homeService;
    AJAX.getRequest(schoolNewUrl,'GET','')
        .success(function(data,status){
            $scope.new = data.response.right;
        });
    $scope.info = function(id){
        AJAX.getRequest('/article/show/'+id,'GET','')
            .success(function(data,status){
                $scope.homeService.htmlPage=data;
            });
    }
}])
.controller('LmarjorNewCtl',['$scope','$sce','AJAX','majorNewUrl','homeService',function($scope,sce,AJAX,majorNewUrl,homeService){
    $scope.new = "";
    $scope.homeService = homeService;
    AJAX.getRequest(majorNewUrl,'GET','')
        .success(function(data,status){
            $scope.new = data.response.left;
        });
    $scope.info = function(id){
        AJAX.getRequest('/article/show/'+id,'GET','')
            .success(function(data,status){
                $scope.homeService.htmlPage=data;
            });
    }
}])
.controller('RmarjorNewCtl',['$scope','$sce','AJAX','majorNewUrl','homeService',function($scope,sce,AJAX,majorNewUrl,homeService){
    $scope.new = "";
    $scope.homeService = homeService;
    AJAX.getRequest(majorNewUrl,'GET','')
        .success(function(data,status){
            $scope.new = data.response.right;
        });
    $scope.info = function(id){
        AJAX.getRequest('/article/show/'+id,'GET','')
            .success(function(data,status){
                $scope.homeService.htmlPage=data;
            });
    }
}])
.controller('LrecipeNewCtl',['$scope','$sce','AJAX','recipeNewUrl','homeService',function($scope,sce,AJAX,recipeNewUrl,homeService){
    $scope.new = "";
    $scope.homeService = homeService;
    AJAX.getRequest(recipeNewUrl,'GET','')
        .success(function(data,status){
            $scope.new = data.response.left;
        });
    $scope.info = function(id){
        AJAX.getRequest('/article/show/'+id,'GET','')
            .success(function(data,status){
                $scope.homeService.htmlPage=data;
            });
    }
}])
.controller('RrecipeNewCtl',['$scope','$sce','AJAX','recipeNewUrl','homeService',function($scope,sce,AJAX,recipeNewUrl,homeService){
    $scope.new = "";
    $scope.homeService = homeService;
    AJAX.getRequest(recipeNewUrl,'GET','')
        .success(function(data,status){
            $scope.new = data.response.right;
        });
    $scope.info = function(id){
        AJAX.getRequest('/article/show/'+id,'GET','')
            .success(function(data,status){
                $scope.homeService.htmlPage=data;
            });
    }
}])
.controller('LscoreNewCtl',['$scope','$sce','AJAX','scoreNewUrl','homeService',function($scope,sce,AJAX,scoreNewUrl,homeService){
    $scope.new = "";
    $scope.homeService = homeService;
    AJAX.getRequest(scoreNewUrl,'GET','')
        .success(function(data,status){
            $scope.new = data.response.left;
        });
    $scope.info = function(id){
        AJAX.getRequest('/article/show/'+id,'GET','')
            .success(function(data,status){
                $scope.homeService.htmlPage=data;
            });
    }
}])
.controller('RscoreNewCtl',['$scope','$sce','AJAX','scoreNewUrl','homeService',function($scope,sce,AJAX,scoreNewUrl,homeService){
    $scope.new = "";
    $scope.homeService = homeService;
    AJAX.getRequest(scoreNewUrl,'GET','')
        .success(function(data,status){
            $scope.new = data.response.right;
        });
    $scope.info = function(id){
        AJAX.getRequest('/article/show/'+id,'GET','')
            .success(function(data,status){
                $scope.homeService.htmlPage=data;
            });
    }
}])
.controller('LpolicyNewCtl',['$scope','$sce','AJAX','policyNewUrl','homeService',function($scope,sce,AJAX,policyNewUrl,homeService){
    $scope.new = "";
    $scope.homeService = homeService;
    AJAX.getRequest(policyNewUrl,'GET','')
        .success(function(data,status){
            $scope.new = data.response.left;
        });
    $scope.info = function(id){
        AJAX.getRequest('/article/show/'+id,'GET','')
            .success(function(data,status){
                $scope.homeService.htmlPage=data;
            });
    }
}])
.controller('RpolicyNewCtl',['$scope','$sce','AJAX','policyNewUrl','homeService',function($scope,sce,AJAX,policyNewUrl,homeService){
    $scope.new = "";
    $scope.homeService = homeService;
    AJAX.getRequest(policyNewUrl,'GET','')
        .success(function(data,status){
            $scope.new = data.response.right;
        });
    $scope.info = function(id){
        AJAX.getRequest('/article/show/'+id,'GET','')
            .success(function(data,status){
                $scope.homeService.htmlPage=data;
            });
    }
}])
.controller('LjobNewCtl',['$scope','$sce','AJAX','jobNewUrl','homeService',function($scope,sce,AJAX,jobNewUrl,homeService){
    $scope.new = "";
    $scope.homeService = homeService;
    AJAX.getRequest(jobNewUrl,'GET','')
        .success(function(data,status){
            $scope.new = data.response.left;
        });
    $scope.info = function(id){
        AJAX.getRequest('/article/show/'+id,'GET','')
            .success(function(data,status){
                $scope.homeService.htmlPage=data;
            });
    }
}])
.controller('RjobNewCtl',['$scope','$sce','AJAX','jobNewUrl','homeService',function($scope,sce,AJAX,jobNewUrl,homeService){
    $scope.new = "";
    $scope.homeService = homeService;
    AJAX.getRequest(jobNewUrl,'GET','')
        .success(function(data,status){
            $scope.new = data.response.right;
        });
    $scope.info = function(id){
        AJAX.getRequest('/article/show/'+id,'GET','')
            .success(function(data,status){
                $scope.homeService.htmlPage=data;
            });
    }
}])
.controller('LuniqueNewCtl',['$scope','$sce','AJAX','uniqueNewUrl','homeService',function($scope,sce,AJAX,jobNewUrl,homeService){
    $scope.new = "";
    $scope.homeService = homeService;
    AJAX.getRequest(jobNewUrl,'GET','')
        .success(function(data,status){
            $scope.new = data.response.left;
        });
    $scope.info = function(id){
        AJAX.getRequest('/article/show/'+id,'GET','')
            .success(function(data,status){
                $scope.homeService.htmlPage=data;
            });
    }
}])
.controller('RuniqueNewCtl',['$scope','$sce','AJAX','uniqueNewUrl','homeService',function($scope,sce,AJAX,jobNewUrl,homeService){
    $scope.new = "";
    $scope.homeService = homeService;
    AJAX.getRequest(jobNewUrl,'GET','')
        .success(function(data,status){
            $scope.new = data.response.right;
        });
    $scope.info = function(id){
        AJAX.getRequest('/article/show/'+id,'GET','')
            .success(function(data,status){
                $scope.homeService.htmlPage=data;
            });
    }
}])