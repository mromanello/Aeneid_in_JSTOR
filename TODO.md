* fix the orientation of the tooltip
* in the ipython notebook, fix the sorting of line groups (e.g. 12.19, 12.2, 12.20)
* data consistency
    - in the grouping of results there are some problems that need some debugging
    - e.g. in the results for Book 6, lines 601-650, line 6.595 shows up
    - this may be due to lines spanning over multiple lines but need to be checked
* to implement the jump-to-line function:
    - add a listener to the shown event of the accordion
* check issue with unicode encoding of json data (`quot_freq.json`)