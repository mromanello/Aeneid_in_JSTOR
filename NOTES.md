
## Next Steps


* install and try the template engine `mustache` <https://github.com/janl/mustache.js>
* do grouping/sorting in the notebook:
    - group by line and then by article
    - sort the articles by year (ascending)
    - sort lines (ascending)
* test Bootstrap accordion and turn it into a Mustache template 

* change orientation of tooltip according to position in the heatmap
* https://github.com/flesler/jquery.scrollTo
* use bootstrap notifications for key events in the interface

* ~~work on the display of results~~
* ~~get text of Aeneid from .xml file instead of CTS API~~
* ~~implement click-event on heatmap => highlights text on middle column~~
* ~~get dropdown filter to work (re-draw index)~~
* ~~add scroll to columns~~

## how the visualisation should work

main functions:
1. create index (heatmap, left column); allow for filtering the type of counts to be displayed ("all"|"quotations"|"references")
2. load text from json (middle column)
3. display results (right column)

Text display:

- text divided into chunks (can then be mapped to divs); each chunk/div has a URN-like id 
- (IDEA): colour the lines of text based on the number of references/quotations they have. Need to group them by line   

Results display:

- use one or more accordions to let the user dig into the results
- group by quoted/referenced line, then group by papers
- use bootstrap badges to indicate the number of elements in a given accordion

## Useful links/resources

* for tooltips in d3.js see => http://labratrevenge.com/d3-tip/
* for the implementation of heatmaps in d3 follow => <http://bl.ocks.org/tjdecke/5558084>
