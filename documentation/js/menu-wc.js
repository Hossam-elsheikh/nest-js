'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nestjs-intro documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-c8987d2c69204246414a47f258a37d12a212bb6b06fb2bc2138506ef472185e366a7a844a31deb224b338b6d93f520f5311c844a51ab3c7e90b1bf09caba5dde"' : 'data-bs-target="#xs-controllers-links-module-AppModule-c8987d2c69204246414a47f258a37d12a212bb6b06fb2bc2138506ef472185e366a7a844a31deb224b338b6d93f520f5311c844a51ab3c7e90b1bf09caba5dde"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-c8987d2c69204246414a47f258a37d12a212bb6b06fb2bc2138506ef472185e366a7a844a31deb224b338b6d93f520f5311c844a51ab3c7e90b1bf09caba5dde"' :
                                            'id="xs-controllers-links-module-AppModule-c8987d2c69204246414a47f258a37d12a212bb6b06fb2bc2138506ef472185e366a7a844a31deb224b338b6d93f520f5311c844a51ab3c7e90b1bf09caba5dde"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-c8987d2c69204246414a47f258a37d12a212bb6b06fb2bc2138506ef472185e366a7a844a31deb224b338b6d93f520f5311c844a51ab3c7e90b1bf09caba5dde"' : 'data-bs-target="#xs-injectables-links-module-AppModule-c8987d2c69204246414a47f258a37d12a212bb6b06fb2bc2138506ef472185e366a7a844a31deb224b338b6d93f520f5311c844a51ab3c7e90b1bf09caba5dde"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-c8987d2c69204246414a47f258a37d12a212bb6b06fb2bc2138506ef472185e366a7a844a31deb224b338b6d93f520f5311c844a51ab3c7e90b1bf09caba5dde"' :
                                        'id="xs-injectables-links-module-AppModule-c8987d2c69204246414a47f258a37d12a212bb6b06fb2bc2138506ef472185e366a7a844a31deb224b338b6d93f520f5311c844a51ab3c7e90b1bf09caba5dde"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-7da12dd89db97099517d7e515fb399fda3bcced122bc894b15fcd698d6d6838dd8b7b89afce97f07dd4e5dbe063a530099127bbe4e6abc86d4a9ab8797910818"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-7da12dd89db97099517d7e515fb399fda3bcced122bc894b15fcd698d6d6838dd8b7b89afce97f07dd4e5dbe063a530099127bbe4e6abc86d4a9ab8797910818"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-7da12dd89db97099517d7e515fb399fda3bcced122bc894b15fcd698d6d6838dd8b7b89afce97f07dd4e5dbe063a530099127bbe4e6abc86d4a9ab8797910818"' :
                                            'id="xs-controllers-links-module-AuthModule-7da12dd89db97099517d7e515fb399fda3bcced122bc894b15fcd698d6d6838dd8b7b89afce97f07dd4e5dbe063a530099127bbe4e6abc86d4a9ab8797910818"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-7da12dd89db97099517d7e515fb399fda3bcced122bc894b15fcd698d6d6838dd8b7b89afce97f07dd4e5dbe063a530099127bbe4e6abc86d4a9ab8797910818"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-7da12dd89db97099517d7e515fb399fda3bcced122bc894b15fcd698d6d6838dd8b7b89afce97f07dd4e5dbe063a530099127bbe4e6abc86d4a9ab8797910818"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-7da12dd89db97099517d7e515fb399fda3bcced122bc894b15fcd698d6d6838dd8b7b89afce97f07dd4e5dbe063a530099127bbe4e6abc86d4a9ab8797910818"' :
                                        'id="xs-injectables-links-module-AuthModule-7da12dd89db97099517d7e515fb399fda3bcced122bc894b15fcd698d6d6838dd8b7b89afce97f07dd4e5dbe063a530099127bbe4e6abc86d4a9ab8797910818"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostsModule-514a52c66e2a03d0a5c75db3029041d82b01ec6404aeb239fe10f1e41f913f9f7318438b1489ce994ae37e7400473544aa1a940e8a0976f14282d64c45dac6f4"' : 'data-bs-target="#xs-controllers-links-module-PostsModule-514a52c66e2a03d0a5c75db3029041d82b01ec6404aeb239fe10f1e41f913f9f7318438b1489ce994ae37e7400473544aa1a940e8a0976f14282d64c45dac6f4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-514a52c66e2a03d0a5c75db3029041d82b01ec6404aeb239fe10f1e41f913f9f7318438b1489ce994ae37e7400473544aa1a940e8a0976f14282d64c45dac6f4"' :
                                            'id="xs-controllers-links-module-PostsModule-514a52c66e2a03d0a5c75db3029041d82b01ec6404aeb239fe10f1e41f913f9f7318438b1489ce994ae37e7400473544aa1a940e8a0976f14282d64c45dac6f4"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostsModule-514a52c66e2a03d0a5c75db3029041d82b01ec6404aeb239fe10f1e41f913f9f7318438b1489ce994ae37e7400473544aa1a940e8a0976f14282d64c45dac6f4"' : 'data-bs-target="#xs-injectables-links-module-PostsModule-514a52c66e2a03d0a5c75db3029041d82b01ec6404aeb239fe10f1e41f913f9f7318438b1489ce994ae37e7400473544aa1a940e8a0976f14282d64c45dac6f4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-514a52c66e2a03d0a5c75db3029041d82b01ec6404aeb239fe10f1e41f913f9f7318438b1489ce994ae37e7400473544aa1a940e8a0976f14282d64c45dac6f4"' :
                                        'id="xs-injectables-links-module-PostsModule-514a52c66e2a03d0a5c75db3029041d82b01ec6404aeb239fe10f1e41f913f9f7318438b1489ce994ae37e7400473544aa1a940e8a0976f14282d64c45dac6f4"' }>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-d07acee7912b3a6c80947b450ab6cafc1961a734d6b8faae3371744537eaa999e48fd51374ae76132d63a623d0c60a69d2f9d799e4496554a51083f920ce179b"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-d07acee7912b3a6c80947b450ab6cafc1961a734d6b8faae3371744537eaa999e48fd51374ae76132d63a623d0c60a69d2f9d799e4496554a51083f920ce179b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-d07acee7912b3a6c80947b450ab6cafc1961a734d6b8faae3371744537eaa999e48fd51374ae76132d63a623d0c60a69d2f9d799e4496554a51083f920ce179b"' :
                                            'id="xs-controllers-links-module-UsersModule-d07acee7912b3a6c80947b450ab6cafc1961a734d6b8faae3371744537eaa999e48fd51374ae76132d63a623d0c60a69d2f9d799e4496554a51083f920ce179b"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-d07acee7912b3a6c80947b450ab6cafc1961a734d6b8faae3371744537eaa999e48fd51374ae76132d63a623d0c60a69d2f9d799e4496554a51083f920ce179b"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-d07acee7912b3a6c80947b450ab6cafc1961a734d6b8faae3371744537eaa999e48fd51374ae76132d63a623d0c60a69d2f9d799e4496554a51083f920ce179b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-d07acee7912b3a6c80947b450ab6cafc1961a734d6b8faae3371744537eaa999e48fd51374ae76132d63a623d0c60a69d2f9d799e4496554a51083f920ce179b"' :
                                        'id="xs-injectables-links-module-UsersModule-d07acee7912b3a6c80947b450ab6cafc1961a734d6b8faae3371744537eaa999e48fd51374ae76132d63a623d0c60a69d2f9d799e4496554a51083f920ce179b"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreatePostDTO.html" data-type="entity-link" >CreatePostDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostMetaOptionsDTO.html" data-type="entity-link" >CreatePostMetaOptionsDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDTO.html" data-type="entity-link" >CreateUserDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersParamDTO.html" data-type="entity-link" >GetUsersParamDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/MetaOption.html" data-type="entity-link" >MetaOption</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchPostDTO.html" data-type="entity-link" >PatchPostDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDTO.html" data-type="entity-link" >PatchUserDTO</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});