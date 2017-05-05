import React from 'react'
import ReactDOM from 'react-dom'
import ReactGuideTour from './components/ReactGuideTour'
import $ from 'jquery'

var ReactGuideTourDemo = React.createClass({
    startTour () {
        this.refs['tour'].startTour()
    },
    tourDismissed () {
        window.alert('Site Guide Tour ended')
    },
    render () {
        var steps = [
            {
                selector: '.stop-1',
                message: 'This is a beautiful title!',
                image:'http://placehold.it/256x192',
                modalPosition: 'bottom'
            },
            {
                selector: '.stop-2',
                message: 'Let\'s point here!',
                image:'http://placehold.it/256x192',
                modalPosition: 'right'
            },
            {
                selector: () => $('.stop-3')[0],
                message: 'This is on the right!',
                image:'http://placehold.it/256x192',
                modalPosition: 'right',
                onChange (index) {
                    //function content
                }
            },
            {
                selector: '.stop-4',
                message: 'The modal is on the left',
                image:'http://placehold.it/256x192',
                modalPosition: 'left'
            },
            {
                selector: '.stop-5',
                message: 'The modal is on the left',
                image:'http://placehold.it/256x192',
                modalPosition: 'left'
            },
            {
                message: 'Done',
                modalPosition: 'center',
                image:'http://placehold.it/296x204',
                btnText: "This is last step!"
            }
        ]
        return (
            <div>
            <div>
                <div
                    style={{width: 200, height: 25, left: 0, top: 0, position: "absolute", backgroundColor: "blanchedalmond", textAlign: "center", paddingTop: 10, fontWeight: 700, cursor: "pointer"}}
                    onClick={() => this.startTour()}
                >
                    Restart Tour
                </div>
                <div
                    style={{width: 200, height: 100, left: "60%", top: 0, position: "absolute", backgroundColor: "red"}}
                    className="stop-1"
                />
                <div
                    style={{width: 100, height: 200, left: 0, top: "40%", position: "absolute", backgroundColor: "blue"}}
                    className="stop-2"
                />
                <div
                    style={{width: 200, height: 100, left: "50%", bottom: 0, position: "absolute", backgroundColor: "yellow"}}
                    className="stop-3"
                />
                <div
                    style={{width: 200, height: 100, right: 0, top: "30%", position: "absolute", backgroundColor: "green"}}
                    className="stop-41"
                />
                <p style={{color: "black"}}>
                    Dolores phaedrum pri eu. Ex sit quot commune, ut eam error elitr scribentur. Quis reprimique in eos, eum intellegat persequeris te, no mei quidam reformidans. Fugit dignissim no qui, ut equidem scaevola has. Per odio facilisis ei, sed tale ignota quodsi id.

                    Te omnes saperet liberavisse eos, etiam oratio eam no, te tation tritani cotidieque nec. Suavitate interpretaris ei sed. Ei viderer scriptorem usu, cu mei numquam utroque. Vim eu commodo euripidis. Cetero alterum necessitatibus sed ei, dicunt aliquid definitiones et vim.

                    Assueverit comprehensam duo ad. Usu nostro omnium ocurreret ad, vel ut quaeque singulis, ne cum adhuc partem. Te aperiam moderatius nec, veri dicunt voluptua id sea. At vix epicuri referrentur, et harum ceteros quaerendum vis. Est ferri adhuc equidem in, eu graeco feugiat hendrerit duo, malis accusata prodesset te duo. Eu erat corpora disputationi vel, pro soleat ceteros praesent no.

                    Ceteros detracto vix ex. Cu oblique prompta inciderint vix, dicat ponderum inimicus no pri. Ne fugit audire eam, duo error soluta imperdiet at. Ius et habemus adversarium. Scripta blandit appareat ex cum, euismod appareat accusata qui an, mel ut hendrerit intellegam.

                    Qui te commune corrumpit tincidunt, nec quot partiendo tincidunt no. Eam discere bonorum ne, paulo perfecto legendos at vis, voluptua accusamus liberavisse id quo. Sit cu noster intellegat. Eam mandamus voluptatum vituperatoribus ex, summo nulla an vix, mea ei molestie postulant imperdiet. No everti numquam tacimates cum, ex aeque tibique intellegat his. Vix et tollit graeco invidunt, minim verterem at pri.

                    Essent verear urbanitas quo ne, harum lucilius mnesarchum ad has, verear torquatos ne nam. Vix latine nostrum no, est veritus omnesque ei. Mea ne diceret voluptaria. Eam aliquam postulant in, vis te civibus deterruisset. Eam justo legendos qualisque no. Ea fastidii liberavisse sea, nam eripuit sententiae definiebas et. Te corpora ocurreret similique mei, ne est soleat noster eripuit.

                    Eum ea etiam tractatos, mea ut facer labore. Stet dissentiunt in cum. Eirmod consulatu mea ex, id vis nisl maiorum copiosae, pro odio labitur voluptua ex. Ei pri inermis convenire maiestatis, ullum iuvaret minimum in his. Facer maiestatis usu ex. In vel nulla probatus similique.

                    Qui oportere sententiae cu, ut nec labores facilisi. At prima legere pertinacia mei, est cu diam viderer. Nam semper mandamus in, ei aliquip voluptua vel. Ad ius falli graece, lorem novum malorum et cum. Ne expetenda constituto constituam vis, te velit interpretaris sea, vis ubique meliore an.

                    His prima quodsi scriptorem ad, an ius malis legere nostrum. Illum iudicabit intellegat ea ius. In duo adolescens consequuntur, duo everti patrioque repudiandae eu. At vim epicuri hendrerit conclusionemque, et dicta copiosae pro. Nec brute fabellas theophrastus cu.

                    Habeo choro nec in. Prima conclusionemque est ei, ne eam graeco adipisci. Detraxit abhorreant vel te. Dolores deterruisset in quo.

                </p>

                <p style={{color: "black"}}>
                    Dolores phaedrum pri eu. Ex sit quot commune, ut eam error elitr scribentur. Quis reprimique in eos, eum intellegat persequeris te, no mei quidam reformidans. Fugit dignissim no qui, ut equidem scaevola has. Per odio facilisis ei, sed tale ignota quodsi id.

                    Te omnes saperet liberavisse eos, etiam oratio eam no, te tation tritani cotidieque nec. Suavitate interpretaris ei sed. Ei viderer scriptorem usu, cu mei numquam utroque. Vim eu commodo euripidis. Cetero alterum necessitatibus sed ei, dicunt aliquid definitiones et vim.

                    Assueverit comprehensam duo ad. Usu nostro omnium ocurreret ad, vel ut quaeque singulis, ne cum adhuc partem. Te aperiam moderatius nec, veri dicunt voluptua id sea. At vix epicuri referrentur, et harum ceteros quaerendum vis. Est ferri adhuc equidem in, eu graeco feugiat hendrerit duo, malis accusata prodesset te duo. Eu erat corpora disputationi vel, pro soleat ceteros praesent no.

                    Ceteros detracto vix ex. Cu oblique prompta inciderint vix, dicat ponderum inimicus no pri. Ne fugit audire eam, duo error soluta imperdiet at. Ius et habemus adversarium. Scripta blandit appareat ex cum, euismod appareat accusata qui an, mel ut hendrerit intellegam.

                    Qui te commune corrumpit tincidunt, nec quot partiendo tincidunt no. Eam discere bonorum ne, paulo perfecto legendos at vis, voluptua accusamus liberavisse id quo. Sit cu noster intellegat. Eam mandamus voluptatum vituperatoribus ex, summo nulla an vix, mea ei molestie postulant imperdiet. No everti numquam tacimates cum, ex aeque tibique intellegat his. Vix et tollit graeco invidunt, minim verterem at pri.

                    Essent verear urbanitas quo ne, harum lucilius mnesarchum ad has, verear torquatos ne nam. Vix latine nostrum no, est veritus omnesque ei. Mea ne diceret voluptaria. Eam aliquam postulant in, vis te civibus deterruisset. Eam justo legendos qualisque no. Ea fastidii liberavisse sea, nam eripuit sententiae definiebas et. Te corpora ocurreret similique mei, ne est soleat noster eripuit.

                    Eum ea etiam tractatos, mea ut facer labore. Stet dissentiunt in cum. Eirmod consulatu mea ex, id vis nisl maiorum copiosae, pro odio labitur voluptua ex. Ei pri inermis convenire maiestatis, ullum iuvaret minimum in his. Facer maiestatis usu ex. In vel nulla probatus similique.

                    Qui oportere sententiae cu, ut nec labores facilisi. At prima legere pertinacia mei, est cu diam viderer. Nam semper mandamus in, ei aliquip voluptua vel. Ad ius falli graece, lorem novum malorum et cum. Ne expetenda constituto constituam vis, te velit interpretaris sea, vis ubique meliore an.

                    His prima quodsi scriptorem ad, an ius malis legere nostrum. Illum iudicabit intellegat ea ius. In duo adolescens consequuntur, duo everti patrioque repudiandae eu. At vim epicuri hendrerit conclusionemque, et dicta copiosae pro. Nec brute fabellas theophrastus cu.

                    Habeo choro nec in. Prima conclusionemque est ei, ne eam graeco adipisci. Detraxit abhorreant vel te. Dolores deterruisset in quo.

                </p>
                <p style={{color: "black"}}>
                    Dolores phaedrum pri eu. Ex sit quot commune, ut eam error elitr scribentur. Quis reprimique in eos, eum intellegat persequeris te, no mei quidam reformidans. Fugit dignissim no qui, ut equidem scaevola has. Per odio facilisis ei, sed tale ignota quodsi id.

                    Te omnes saperet liberavisse eos, etiam oratio eam no, te tation tritani cotidieque nec. Suavitate interpretaris ei sed. Ei viderer scriptorem usu, cu mei numquam utroque. Vim eu commodo euripidis. Cetero alterum necessitatibus sed ei, dicunt aliquid definitiones et vim.

                    Assueverit comprehensam duo ad. Usu nostro omnium ocurreret ad, vel ut quaeque singulis, ne cum adhuc partem. Te aperiam moderatius nec, veri dicunt voluptua id sea. At vix epicuri referrentur, et harum ceteros quaerendum vis. Est ferri adhuc equidem in, eu graeco feugiat hendrerit duo, malis accusata prodesset te duo. Eu erat corpora disputationi vel, pro soleat ceteros praesent no.

                    Ceteros detracto vix ex. Cu oblique prompta inciderint vix, dicat ponderum inimicus no pri. Ne fugit audire eam, duo error soluta imperdiet at. Ius et habemus adversarium. Scripta blandit appareat ex cum, euismod appareat accusata qui an, mel ut hendrerit intellegam.

                    Qui te commune corrumpit tincidunt, nec quot partiendo tincidunt no. Eam discere bonorum ne, paulo perfecto legendos at vis, voluptua accusamus liberavisse id quo. Sit cu noster intellegat. Eam mandamus voluptatum vituperatoribus ex, summo nulla an vix, mea ei molestie postulant imperdiet. No everti numquam tacimates cum, ex aeque tibique intellegat his. Vix et tollit graeco invidunt, minim verterem at pri.

                    Essent verear urbanitas quo ne, harum lucilius mnesarchum ad has, verear torquatos ne nam. Vix latine nostrum no, est veritus omnesque ei. Mea ne diceret voluptaria. Eam aliquam postulant in, vis te civibus deterruisset. Eam justo legendos qualisque no. Ea fastidii liberavisse sea, nam eripuit sententiae definiebas et. Te corpora ocurreret similique mei, ne est soleat noster eripuit.

                    Eum ea etiam tractatos, mea ut facer labore. Stet dissentiunt in cum. Eirmod consulatu mea ex, id vis nisl maiorum copiosae, pro odio labitur voluptua ex. Ei pri inermis convenire maiestatis, ullum iuvaret minimum in his. Facer maiestatis usu ex. In vel nulla probatus similique.

                    Qui oportere sententiae cu, ut nec labores facilisi. At prima legere pertinacia mei, est cu diam viderer. Nam semper mandamus in, ei aliquip voluptua vel. Ad ius falli graece, lorem novum malorum et cum. Ne expetenda constituto constituam vis, te velit interpretaris sea, vis ubique meliore an.

                    His prima quodsi scriptorem ad, an ius malis legere nostrum. Illum iudicabit intellegat ea ius. In duo adolescens consequuntur, duo everti patrioque repudiandae eu. At vim epicuri hendrerit conclusionemque, et dicta copiosae pro. Nec brute fabellas theophrastus cu.

                    Habeo choro nec in. Prima conclusionemque est ei, ne eam graeco adipisci. Detraxit abhorreant vel te. Dolores deterruisset in quo.

                </p>
            </div>
            <div
                style={{width: 200, height: 100, right: 0, top: "30%", position: "relative", backgroundColor: "green"}}
                className="stop-4"
            />
            <div
                style={{width: 50, height: 50, right: 20, bottom:20, position: "absolute", backgroundColor: "pink"}}
                className="stop-5"
            />
            <div>
                <ReactGuideTour ref='tour' enableAutoPositioning={true} steps={steps} onTourEnd={this.tourDismissed} />
            </div>
            </div>
        )
    }
})

ReactDOM.render(<ReactGuideTourDemo />, document.getElementById('react-guide-tour'))
