import MyCapytain
from MyCapytain.retrievers import cts5
from MyCapytain.common.utils import xmlparser
from MyCapytain.resources.texts.api import Text
import multiprocessing as mp 
import parmap
import json
import codecs

endpoint = "http://cts.perseids.org/api/cts"
cts = cts5.CTS(endpoint)
urn = "urn:cts:latinLit:phi0690.phi003"
work_urn = "urn:cts:latinLit:phi0690.phi003"
passage = xmlparser(cts.getPassage(urn=urn))
passage.xpath("//tei:l",namespaces=MyCapytain.common.utils.NS)[0].text

urn = "urn:cts:latinLit:phi0690.phi003:1.334"
text = Text(urn=urn, resource=cts)
passage = text.getPassage()
print passage.text()

book_upper_boundaries = {
	1:756
	,2:804
	,3:719
	,4:705
	,5:871
	,6:901
	,7:817
	,8:731
	,9:818
	,10:908
	,11:915
	,12:952
}

def chunks(l, n):
    """Yield successive n-sized chunks from l."""
    for i in xrange(0, len(l), n):
        yield l[i:i+n]

bins = {(bin[0],bin[-1]):bin for bin in list(chunks(range(1,1001),50))}

def fetch_text(urn, cts_client):
	reference = urn.split(":")[-1]
	reply = cts.getPassage(urn=urn)
	passage = xmlparser(reply)
	try:
		text = passage.xpath("//tei:l",namespaces=MyCapytain.common.utils.NS)[0].text
		return {"line":reference,"text":text}
	except Exception, e:
		print "there was a problem fetching %s"%urn

text = []
for book_number in sorted(book_upper_boundaries.keys())[:1]:
    max_line_number = book_upper_boundaries[book_number]
    for range_start,range_end in bins.keys():
    	chunk = {
    		"book": book_number
    		,"chunk" : "%i-%i"%(range_start,range_end)
    		,"lines" : []
    	}
    	passage_urns = ["%s:%s"%(work_urn,"%i.%i"%(book_number,passage)) 
    							for passage in range(range_start, range_end+1) if range_start <= max_line_number and range_end <= max_line_number]
    	lines = parmap.map(fetch_text,passage_urns, cts,pool=mp.Pool())
    	if(len(lines)>0):
    		chunk["lines"] = lines
    	text.append(chunk)
outf = codecs.open("aeneid.json","w","utf-8")
json.dump(text,outf,encoding="utf-8")
outf.close()