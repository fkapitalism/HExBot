//It searches for all elements with the specified tagName, then filter those elements that have the specified attribName valued as attribValue.
//Next it gets one element from specified position on the elements array and returns it 
function getDOMElement(tagName, attribName, attribValue, position, color) {
    if (tagName != null) {
        element = document.getElementsByTagName(tagName)
    } else {
        element = document.getElementsByTagName("*")
    }
    resultElements = []
    var count;
    if (attribName != null) {
        for (count = 0; count < element.length; count++) {
            if (element[count].getAttribute(attribName) == attribValue) {
                resultElements.push(element[count])
            }
        }
    } else {
        resultElements = element
    }
    if (resultElements.length > 0) {
        if (position == "last") position = resultElements.length - 1
        try {
            
        } catch (error) {
            console.log(error.message)
        }
        try{ //Color the element
            if (color !== false)
            resultElements[position].style.color = "red"
        } catch(error){
            console.log(error.message)
        }
        return resultElements[position]
    } else {
        return null
    }
}

/*== adjacent function ==*/
function get_lack(elemA, elemB){
    lack = get_chars().indexOf(elemB) - get_chars().indexOf(elemA)
    if(lack < 0)
        return get_chars().length - get_chars().indexOf(elemA) + get_chars().indexOf(elemB)
    else
        return lack
}