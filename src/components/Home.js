import React from 'react'

function Home() {
  return (
    <div class="logged-out env-production page-responsive header-overlay" style={{"word-wrap": "break-word"}}>


  <div class="application-main ">
    <main class="font-mktg">

      <div class="overflow-hidden">
        <div class="home-hero-container position-relative js-webgl-globe-data">
          <div class="home-hero position-absolute z-1 top-0 right-0 bottom-0 left-0 overflow-hidden" data-hpc="">
            <div class="d-flex flex-column flex-justify-between mx-auto container-xl p-responsive height-full pb-md-9">

              <div class="d-flex flex-column flex-lg-row flex-items-center height-full">
                <div class="col-12 col-lg-7 text-center text-md-left">

                  <h1 class="h3-mktg color-text-white mb-3 position-relative z-2">
                    BlockChain based Certification system for,
                    <span class="position-relative overflow-hidden d-block width-full" style={{"height": "1.2em"}}>
                      <span class="position-absolute left-0 width-full home-tagline-appendix"
                        style={{"animation-delay": "0ms"}}>Verified</span>
                      <span class="position-absolute left-0 width-full home-tagline-appendix"
                        style={{"animation-delay": "1500ms"}}>Authenticated</span>
                      <span class="position-absolute left-0 width-full home-tagline-appendix"
                        style={{"animation-delay": "3000ms"}}>Secure</span>
                      <span class="position-absolute left-0 width-full home-tagline-appendix"
                        style={{"animation-delay": "4500ms"}}>Temper-proof</span>
                      <span class="position-absolute left-0 width-full home-tagline-appendix"
                        style={{"animation-delay": "6000ms"}}>Fast</span>
                      <span class="position-absolute left-0 width-full home-tagline-appendix"
                        style={{"animation-delay": "7500ms"}}>Verified</span>
                    </span>
                    Certificates
                  </h1>

                  <p
                    class="f3-mktg col-md-7 col-lg-11 col-xl-10 text-normal text-gray-light-mktg mr-lg-n4 mb-4 position-relative z-2">
                    A Decentralized certification platform using Ethereum BlockChian</p>

                  <form data-turbo="false" class="mx-auto mx-md-0 col-5-max js-signup-form position-relative z-2"
                    autocomplete="off" action="/signup" accept-charset="UTF-8" method="get">
                    <button class="btn-mktg width-full width-sm-auto btn-signup-mktg" type="submit"> Login with Metamask
                    </button>
                  </form>
                  <div class="position-lg-absolute bottom-lg-8 left-lg-0 right-lg-0 mt-4 z-1 position-relative">
                    <div class="container-xl mx-auto px-lg-3">
                      <div class="py-4" style={{"border-top": "1px solid rgba(255,255,255,0.1)"}}>
                        <div
                          class="d-flex gutter-condensed gutter-md-spacious col-12 col-lg-8 flex-justify-between text-md-left">
                          <div class="col-6 col-sm-4 col-md-3">
                            <h2 class="f3-mktg text-mono color-text-white text-normal no-wrap">83<span class="text-white-fade">+</span> million</h2>
                            <p class="m-0 text-mono text-white-fade f6-mktg">Developers</p>
                          </div>
                          <div class="col-6 col-sm-4 col-md-3">
                            <h2 class="f3-mktg text-mono color-text-white text-normal no-wrap">4<span
                                class="text-white-fade">+</span> million</h2>
                            <p class="m-0 text-mono text-white-fade f6-mktg">Organizations</p>
                          </div>
                          <div class="col-sm-4 col-md-3 d-none d-md-block">
                            <h2 class="f3-mktg text-mono color-text-white text-normal no-wrap">200<span
                                class="text-white-fade">+</span> million</h2>
                            <p class="m-0 text-mono text-white-fade f6-mktg">Repositories</p>
                          </div>
                          <div class="col-3 d-none d-sm-block">
                            <h3 class="f3-mktg text-mono color-text-white text-normal no-wrap">90%</h3>
                            <p class="m-0 text-mono text-white-fade f6-mktg">Fortune 100</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-12 col-lg-6 text-center text-md-left position-relative">
                  <div class="home-globe-container home-globe-container-webgl d-flex">
                    <div
                      class="mx-auto width-full mt-n9 mt-lg-2 home-globe position-relative height-full js-webgl-globe">
                      <video width="916" height="918" loop="true" muted="true" playsinline="true" autoPlay="true"
                        class="home-globe-container-video js-globe-fallback-video float-md-right">
                        <source type="video/mp4"
                          src="https://github.githubassets.com/images/modules/site/home/globe-900.h264.mp4"/>
                      </video>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* <img src="https://github.githubassets.com/images/modules/site/home/hero-glow.svg" alt="Glowing universe"
              class="position-absolute home-hero-glow events-none z-1"/> */}
          </div>

          <div class="position-absolute width-full color-bg-default" style={{"bottom": "-4rem"}}>
            <div class="container-xl p-responsive">
              <div class="d-flex flex-justify-center flex-lg-justify-end color-bg-default">
                <div class="col-8 col-sm-7 col-md-6 col-lg-5 position-relative z-2 right-lg-n12 events-none">
                  <picture>
                    <source srcset="https://github.githubassets.com/images/modules/site/home/astro-mona.webp"
                      type="image/webp"/>
                    <img src="https://github.githubassets.com/images/modules/site/home/astro-mona.svg" width="960"
                      height="967" class="home-astro-mona width-full position-absolute bottom-0 height-auto"
                      alt="Mona looking at GitHub activity across the globe"/>
                  </picture>
                </div>
              </div>
            </div>
          </div>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" preserveAspectRatio="none" viewBox="0 0 1680 40"
            class="position-absolute width-full z-1" style={{"bottom": "-1px"}}>
            <path d="M0 40h1680V30S1340 0 840 0 0 30 0 30z" fill="#fff"></path>
          </svg>
          <div aria-live="polite" class="sr-only mt-5"></div>
        </div>
        </div>
        </main>
        </div>
</div>
  )
}

export default Home