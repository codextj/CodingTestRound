<emp>To generate diamond output on console make sure you are passing a-z or A-Z as a
command line arguement to diamond.js script. Input read through process.argv[2]</emp>
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

$ node diamond.js g --addCross --printHTML
<pre>
A     A     A
 B   B B   B
  C C   C C
   D     D
  E E   E E
 F   F F   F
G     G     G
 F   F F   F
  E E   E E
   D     D
  C C   C C
 B   B B   B
A     A     A
Shape Viz saved in > shapeViz.html
</pre>
