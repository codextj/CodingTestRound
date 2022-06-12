To generate diamond output on console make sure you are passing a-z or A-Z as an arguement
command line arguement to diamond.js script. input read through process.argv[2]
--------------------------------------------------------------------------------------------

$ node diamond.js 3
<pre>
Error, Please provide a valid char [A-Z] as an input.
</pre>

--------------------------------------------------------------------------------------------

$ node diamond.js D
<pre>
   A
  B B
 C   C
D     D
 C   C
  B B
   A
</pre>
--------------------------------------------------------------------------------------------

$ node diamond.js c
<pre>
  A
 B B
C   C
 B B
  A
</pre>

---------------------------------------------------------------------------------------------