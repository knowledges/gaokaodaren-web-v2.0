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
.controller('LhomeNewCtl',['$scope','$sce','AJAX','homeNewUrl','htmlService',function($scope,$sce,AJAX,homeNewUrl,htmlService){
        $scope.new = "";
        $scope.htmlService = htmlService;

        AJAX.getRequest(homeNewUrl,'GET','')
            .success(function(data,status){
                $scope.new = data.response.left;
            });

        $scope.info = function(id){
            AJAX.getRequest('/article/show/'+id,'GET','')
                .success(function(data,status){
                    $scope.htmlService.htmlPage=data;
                });
        }

}])
.controller('RhomeNewCtl',['$scope','$sce','AJAX','homeNewUrl','htmlService',function($scope,$sce,AJAX,homeNewUrl,htmlService){
        $scope.new = "";
        $scope.htmlService = htmlService;
        AJAX.getRequest(homeNewUrl,'GET','')
            .success(function(data,status){
                $scope.new = data.response.right;
            });

        $scope.info = function(id){
            AJAX.getRequest('/article/show/'+id,'GET','')
                .success(function(data,status){
                    $scope.htmlService.htmlPage=data;
                });
        }
}])
.controller('LexampleNewCtl',['$scope','$sce','AJAX','exampleNewUrl','htmlService',function($scope,sce,AJAX,exampleNewUrl,htmlService){
        $scope.new = "";
        $scope.htmlService = htmlService;
        AJAX.getRequest(exampleNewUrl,'GET','')
            .success(function(data,status){
                $scope.new = data.response.left;
            });
        $scope.info = function(id){
            AJAX.getRequest('/article/show/'+id,'GET','')
                .success(function(data,status){
                    $scope.htmlService.htmlPage=data;
                });
        }
}])
.controller('RexampleNewCtl',['$scope','$sce','AJAX','exampleNewUrl','htmlService',function($scope,sce,AJAX,exampleNewUrl,htmlService){
        $scope.new = "";
        $scope.htmlService = htmlService;
        AJAX.getRequest(exampleNewUrl,'GET','')
            .success(function(data,status){
                $scope.new = data.response.right;
            });
        $scope.info = function(id){
            AJAX.getRequest('/article/show/'+id,'GET','')
                .success(function(data,status){
                    $scope.htmlService.htmlPage=data;
                });
        }
}])
.controller('LonlineNewCtl',['$scope','$sce','AJAX','onlineUrl','htmlService',function($scope,sce,AJAX,onlineUrl,htmlService){
    $scope.new = "";
    $scope.htmlService = htmlService;
    AJAX.getRequest(onlineUrl,'GET','')
        .success(function(data,status){
            $scope.new = data.response.left;
        });
    $scope.info = function(id){
        AJAX.getRequest('/article/show/'+id,'GET','')
            .success(function(data,status){
                $scope.htmlService.htmlPage=data;
            });
    }
}])
.controller('RonlineNewCtl',['$scope','$sce','AJAX','onlineUrl','htmlService',function($scope,sce,AJAX,onlineUrl,htmlService){
    $scope.new = "";
    $scope.htmlService = htmlService;
    AJAX.getRequest(onlineUrl,'GET','')
        .success(function(data,status){
            $scope.new = data.response.right;
        });
    $scope.info = function(id){
        AJAX.getRequest('/article/show/'+id,'GET','')
            .success(function(data,status){
                $scope.htmlService.htmlPage=data;
            });
    }
}])
.controller('LcityNewCtl',['$scope','$sce','AJAX','cityNewUrl','htmlService',function($scope,sce,AJAX,cityNewUrl,htmlService){
    $scope.new = "";
    $scope.htmlService = htmlService;
    AJAX.getRequest(cityNewUrl,'GET','')
        .success(function(data,status){
            $scope.new = data.response.left;
        });
    $scope.info = function(id){
        AJAX.getRequest('/article/show/'+id,'GET','')
            .success(function(data,status){
                $scope.htmlService.htmlPage=data;
            });
    }
}])
.controller('RcityNewCtl',['$scope','$sce','AJAX','cityNewUrl','htmlService',function($scope,sce,AJAX,cityNewUrl,htmlService){
    $scope.new = "";
    $scope.htmlService = htmlService;
    AJAX.getRequest(cityNewUrl,'GET','')
        .success(function(data,status){
            $scope.new = data.response.right;
        });
    $scope.info = function(id){
        AJAX.getRequest('/article/show/'+id,'GET','')
            .success(function(data,status){
                $scope.htmlService.htmlPage=data;
            });
    }
}])
.controller('LcityNewCtl',['$scope','$sce','AJAX','cityNewUrl','htmlService',function($scope,sce,AJAX,cityNewUrl,htmlService){
    $scope.new = "";
    $scope.htmlService = htmlService;
    AJAX.getRequest(cityNewUrl,'GET','')
        .success(function(data,status){
            $scope.new = data.response.left;
        });
    $scope.info = function(id){
        AJAX.getRequest('/article/show/'+id,'GET','')
            .success(function(data,status){
                $scope.htmlService.htmlPage=data;
            });
    }
}])
.controller('RcityNewCtl',['$scope','$sce','AJAX','cityNewUrl','htmlService',function($scope,sce,AJAX,cityNewUrl,htmlService){
    $scope.new = "";
    $scope.htmlService = htmlService;
    AJAX.getRequest(cityNewUrl,'GET','')
        .success(function(data,status){
            $scope.new = data.response.right;
        });
    $scope.info = function(id){
        AJAX.getRequest('/article/show/'+id,'GET','')
            .success(function(data,status){
                $scope.htmlService.htmlPage=data;
            });
    }
}])
.controller('LschoolNewCtl',['$scope','$sce','AJAX','schoolNewUrl','htmlService',function($scope,sce,AJAX,schoolNewUrl,htmlService){
    $scope.new = "";
    $scope.htmlService = htmlService;
    AJAX.getRequest(schoolNewUrl,'GET','')
        .success(function(data,status){
            $scope.new = data.response.left;
        });
    $scope.info = function(id){
        AJAX.getRequest('/article/show/'+id,'GET','')
            .success(function(data,status){
                $scope.htmlService.htmlPage=data;
            });
    }
}])
.controller('RschoolNewCtl',['$scope','$sce','AJAX','schoolNewUrl','htmlService',function($scope,sce,AJAX,schoolNewUrl,htmlService){
    $scope.new = "";
    $scope.htmlService = htmlService;
    AJAX.getRequest(schoolNewUrl,'GET','')
        .success(function(data,status){
            $scope.new = data.response.right;
        });
    $scope.info = function(id){
        AJAX.getRequest('/article/show/'+id,'GET','')
            .success(function(data,status){
                $scope.htmlService.htmlPage=data;
            });
    }
}])
.controller('LmarjorNewCtl',['$scope','$sce','AJAX','majorNewUrl','htmlService',function($scope,sce,AJAX,majorNewUrl,htmlService){
    $scope.new = "";
    $scope.htmlService = htmlService;
    AJAX.getRequest(majorNewUrl,'GET','')
        .success(function(data,status){
            $scope.new = data.response.left;
        });
    $scope.info = function(id){
        AJAX.getRequest('/article/show/'+id,'GET','')
            .success(function(data,status){
                $scope.htmlService.htmlPage=data;
            });
    }
}])
.controller('RmarjorNewCtl',['$scope','$sce','AJAX','majorNewUrl','htmlService',function($scope,sce,AJAX,majorNewUrl,htmlService){
    $scope.new = "";
    $scope.htmlService = htmlService;
    AJAX.getRequest(majorNewUrl,'GET','')
        .success(function(data,status){
            $scope.new = data.response.right;
        });
    $scope.info = function(id){
        AJAX.getRequest('/article/show/'+id,'GET','')
            .success(function(data,status){
                $scope.htmlService.htmlPage=data;
            });
    }
}])
.controller('LrecipeNewCtl',['$scope','$sce','AJAX','recipeNewUrl','htmlService',function($scope,sce,AJAX,recipeNewUrl,htmlService){
    $scope.new = "";
    $scope.htmlService = htmlService;
    AJAX.getRequest(recipeNewUrl,'GET','')
        .success(function(data,status){
            $scope.new = data.response.left;
        });
    $scope.info = function(id){
        AJAX.getRequest('/article/show/'+id,'GET','')
            .success(function(data,status){
                $scope.htmlService.htmlPage=data;
            });
    }
}])
.controller('RrecipeNewCtl',['$scope','$sce','AJAX','recipeNewUrl','htmlService',function($scope,sce,AJAX,recipeNewUrl,htmlService){
    $scope.new = "";
    $scope.htmlService = htmlService;
    AJAX.getRequest(recipeNewUrl,'GET','')
        .success(function(data,status){
            $scope.new = data.response.right;
        });
    $scope.info = function(id){
        AJAX.getRequest('/article/show/'+id,'GET','')
            .success(function(data,status){
                $scope.htmlService.htmlPage=data;
            });
    }
}])
.controller('LrecipeNewCtl',['$scope','$sce','AJAX','recipeNewUrl','htmlService',function($scope,sce,AJAX,recipeNewUrl,htmlService){
    $scope.new = "";
    $scope.htmlService = htmlService;
    AJAX.getRequest(recipeNewUrl,'GET','')
        .success(function(data,status){
            $scope.new = data.response.left;
        });
    $scope.info = function(id){
        AJAX.getRequest('/article/show/'+id,'GET','')
            .success(function(data,status){
                $scope.htmlService.htmlPage=data;
            });
    }
}])
.controller('RrecipeNewCtl',['$scope','$sce','AJAX','recipeNewUrl','htmlService',function($scope,sce,AJAX,recipeNewUrl,htmlService){
    $scope.new = "";
    $scope.htmlService = htmlService;
    AJAX.getRequest(recipeNewUrl,'GET','')
        .success(function(data,status){
            $scope.new = data.response.right;
        });
    $scope.info = function(id){
        AJAX.getRequest('/article/show/'+id,'GET','')
            .success(function(data,status){
                $scope.htmlService.htmlPage=data;
            });
    }
}])
.controller('LscoreNewCtl',['$scope','$sce','AJAX','scoreNewUrl','htmlService',function($scope,sce,AJAX,scoreNewUrl,htmlService){
    $scope.new = "";
    $scope.htmlService = htmlService;
    AJAX.getRequest(scoreNewUrl,'GET','')
        .success(function(data,status){
            $scope.new = data.response.left;
        });
    $scope.info = function(id){
        AJAX.getRequest('/article/show/'+id,'GET','')
            .success(function(data,status){
                $scope.htmlService.htmlPage=data;
            });
    }
}])
.controller('RscoreNewCtl',['$scope','$sce','AJAX','scoreNewUrl','htmlService',function($scope,sce,AJAX,scoreNewUrl,htmlService){
    $scope.new = "";
    $scope.htmlService = htmlService;
    AJAX.getRequest(scoreNewUrl,'GET','')
        .success(function(data,status){
            $scope.new = data.response.right;
        });
    $scope.info = function(id){
        AJAX.getRequest('/article/show/'+id,'GET','')
            .success(function(data,status){
                $scope.htmlService.htmlPage=data;
            });
    }
}])
.controller('LpllicyNewCtl',['$scope','$sce','AJAX','policyNewUrl','htmlService',function($scope,sce,AJAX,policyNewUrl,htmlService){
    $scope.new = "";
    $scope.htmlService = htmlService;
    AJAX.getRequest(policyNewUrl,'GET','')
        .success(function(data,status){
            $scope.new = data.response.left;
        });
    $scope.info = function(id){
        AJAX.getRequest('/article/show/'+id,'GET','')
            .success(function(data,status){
                $scope.htmlService.htmlPage=data;
            });
    }
}])
.controller('RpllicyNewCtl',['$scope','$sce','AJAX','policyNewUrl','htmlService',function($scope,sce,AJAX,policyNewUrl,htmlService){
    $scope.new = "";
    $scope.htmlService = htmlService;
    AJAX.getRequest(policyNewUrl,'GET','')
        .success(function(data,status){
            $scope.new = data.response.right;
        });
    $scope.info = function(id){
        AJAX.getRequest('/article/show/'+id,'GET','')
            .success(function(data,status){
                $scope.htmlService.htmlPage=data;
            });
    }
}])
.controller('LjobNewCtl',['$scope','$sce','AJAX','jobNewUrl','htmlService',function($scope,sce,AJAX,jobNewUrl,htmlService){
    $scope.new = "";
    $scope.htmlService = htmlService;
    AJAX.getRequest(jobNewUrl,'GET','')
        .success(function(data,status){
            $scope.new = data.response.left;
        });
    $scope.info = function(id){
        AJAX.getRequest('/article/show/'+id,'GET','')
            .success(function(data,status){
                $scope.htmlService.htmlPage=data;
            });
    }
}])
.controller('RjobNewCtl',['$scope','$sce','AJAX','jobNewUrl','htmlService',function($scope,sce,AJAX,jobNewUrl,htmlService){
    $scope.new = "";
    $scope.htmlService = htmlService;
    AJAX.getRequest(jobNewUrl,'GET','')
        .success(function(data,status){
            $scope.new = data.response.right;
        });
    $scope.info = function(id){
        AJAX.getRequest('/article/show/'+id,'GET','')
            .success(function(data,status){
                $scope.htmlService.htmlPage=data;
            });
    }
}])
.controller('LjobNewCtl',['$scope','$sce','AJAX','uniqueNewUrl','htmlService',function($scope,sce,AJAX,jobNewUrl,htmlService){
    $scope.new = "";
    $scope.htmlService = htmlService;
    AJAX.getRequest(jobNewUrl,'GET','')
        .success(function(data,status){
            $scope.new = data.response.left;
        });
    $scope.info = function(id){
        AJAX.getRequest('/article/show/'+id,'GET','')
            .success(function(data,status){
                $scope.htmlService.htmlPage=data;
            });
    }
}])
.controller('RjobNewCtl',['$scope','$sce','AJAX','uniqueNewUrl','htmlService',function($scope,sce,AJAX,jobNewUrl,htmlService){
    $scope.new = "";
    $scope.htmlService = htmlService;
    AJAX.getRequest(jobNewUrl,'GET','')
        .success(function(data,status){
            $scope.new = data.response.right;
        });
    $scope.info = function(id){
        AJAX.getRequest('/article/show/'+id,'GET','')
            .success(function(data,status){
                $scope.htmlService.htmlPage=data;
            });
    }
}])