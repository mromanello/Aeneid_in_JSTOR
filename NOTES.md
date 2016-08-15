
## Next Steps

* get dropdown filter to work (re-draw index)
* use template engine `moustache`
* add scroll to columns
* use bootstrap notifications for key events in the interface

* ~~get text of Aeneid from .xml file instead of CTS API~~
* ~~implement click-event on heatmap => highlights text on middle column~~

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
