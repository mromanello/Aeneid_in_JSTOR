
* add support for https://github.com/ehpc/bootstrap-waitingfor
* in the metadata of references, add `year` (by parsing pubdate)
* ~~fix the orientation of the tooltip~~
* add at the very top of the page, info about passage in focus
* in the ipython notebook, fix the sorting of line groups (e.g. 12.19, 12.2, 12.20)
* ~~add manipula (☞) when jumping to line~~
* ~~add line numbers every 5 lines of text~~

* data consistency
    - in the grouping of results there are some problems that need some debugging
    - e.g. in the results for Book 6, lines 601-650, line 6.595 shows up
    - this may be due to lines spanning over multiple lines but need to be checked
* check issue with unicode encoding of json data (`quot_freq.json`)