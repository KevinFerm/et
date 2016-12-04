import {Component} from 'substance'
const {api, event} = writer
class DevKitComponent extends Component {

    /**
     * Method called when component is disposed and removed from DOM
     */
    dispose() {
        // Perfect place to remove eventlisteners etc
    }

    /**
     * Constructor
     * @param args
     */
    constructor(...args) {
        super(...args)
        
    }
    callback(error,response,body) {
        if (!error && response.statusCode === 200) {
            console.log(body);
        }
    }


    /**
     *
     * @returns {{clickCount: number}}
     */
    getInitialState() {
        return {
            clickCount: 0
        }
    }
    getContent() {
        var nodes = api.document.getDocumentNodes()
        var textContent = "";
        nodes.forEach(function (node) {
            if (node.content) {
                textContent += node.content.trim()
            }
        })
        return textContent
    }
//curl -X POST --include 'https://twinword-sentiment-analysis.p.mashape.com/analyze/' \

    getTextSentiments(text) {
        let url = 'https://twinword-sentiment-analysis.p.mashape.com/analyze/'
        api.router.get('/api/proxy/', {url: url,
            text: text,
            headers: {
                'X-Mashape-Key': "2dryu65QD0msh8bFx7G3V43btP2up135YljjsnOqWFQwzaLGOK",
                "Accept": "application/json"
            }
        })
        .then(response => api.router.checkForOKStatus(response))
        .then(response => response.json())
        .then(json => {
            console.log("Response is", json)
        })
        .catch((e) => {
            console.error(e)
        })
    }



    /**
     * Render method is called whenever there's a change in state or props
     * @param $$
     * @returns {*}
     */
    render($$) {
        const el = $$('div').addClass('devkit')
        let data = this.getContent()
        let sentiments = this.getTextSentiments(data)
        console.log(sentiments)

        el.append($$('h2').append(this.getLabel('Devkit plugin loaded')))
        el.append($$('p').append(String(this.state.clickCount)))

        let clickCount = this.state.clickCount

        let button = $$('button').on('click', () => {
            this.setState({
                clickCount: clickCount+1
            })
        }).append('Click me')

        el.append(button)

        return el
    }
}
export default DevKitComponent