<template>

    






    <div id="main_content">
    <!-- <div id="header_top" class="header_top">
        <div class="container">
            <div class="d-flex">
                <a class="header-brand" href="index.html"><img src="/static/images/logo.svg" class="header-brand-img" alt="buzzerlogo"></a>
                <div class="top_menu d-flex order-lg-2">
                    <div class="hleft">
                        
                    </div>
                    <div class="hright d-flex">
                        
                        <div class="dropdown">
                            <a href="page-empty.html#" class="nav-link pr-0 leading-none" data-toggle="dropdown">
                                <img class="avatar" src="/static/images/user.png" alt=""/>
                                <span class="ml-2 d-none d-lg-block">
                                    <span class="user_name">Jane Pearson</span>
                                    <small class="text-muted d-block mt-1">Administrator</small>
                                </span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow vivify flipInY">
                                <a class="dropdown-item" href="page-empty.html#"><i class="dropdown-icon fe fe-user"></i> Profile</a>
                                <a class="dropdown-item" href="page-empty.html#"><i class="dropdown-icon fe fe-settings"></i> Settings</a>
                                <a class="dropdown-item" href="page-empty.html#"><span class="float-right"><span class="badge badge-primary">6</span></span><i class="dropdown-icon fe fe-mail"></i> Inbox</a>
                                <a class="dropdown-item" href="page-empty.html#"><i class="dropdown-icon fe fe-send"></i> Message</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="page-empty.html#"><i class="dropdown-icon fe fe-help-circle"></i> Need help?</a>
                                <a class="dropdown-item" href="page-empty.html#"><i class="dropdown-icon fe fe-log-out"></i> Sign out</a>
                            </div>
                        </div>
                    </div>
                </div>
                <a href="page-empty.html#" class="btn btn-sm btn-primary header-toggler d-lg-none ml-3 ml-lg-0" data-toggle="collapse" data-target="#headerMenuCollapse"><span class="header-toggler-icon"></span></a>
            </div>
        </div>
    </div> -->

    

    

    <div id="headerMenuCollapse" class="header d-lg-flex collapse">
        <div class="container">
            <div class="row align-items-center">
                
                <div class="col-lg order-lg-first">
                    <ul class="nav nav-tabs border-0 flex-column flex-lg-row">
                      <!-- menu begin -->
                        <li class="nav-item"><router-link to="/" class="nav-link"><i class="fe fe-activity"></i>Home</router-link></li>                        
                        <li class="nav-item"><router-link to="/data" class="nav-link"><i class="fe fe-box"></i>data</router-link></li>                        
                      <!-- menu end -->
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <div class="page">
        <div class="container">
            
        <router-view/>


        </div>
    </div>    

    <footer class="footer">
        <div class="container">
            <div class="row align-items-center flex-row-reverse">
                <div class="col-12 col-lg-auto mt-3 mt-lg-0 text-center">
                    Copyright © 2018 <a href="https://github.com/adventurer/hi-redis">hi-redis</a>. build by <a href="https://www.golangpub.com" target="_blank">golangpub.com</a> All rights reserved.
                </div>
            </div>
        </div>
    </footer>
</div>



</template>

