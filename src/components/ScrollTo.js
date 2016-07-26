import ReactDOM from 'react-dom'
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed'
export default function scrollTo(ref) {
    if (ref) {
        let domNode = ReactDOM.findDOMNode(ref)
        scrollIntoViewIfNeeded(domNode, false)
    }
}
