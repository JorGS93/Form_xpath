<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
<html>
<head>

<style rel="stylesheet" type="text/css">
 <link href="https://fonts.googleapis.com/css?family=Open+Sans:600" rel="stylesheet"></link>
body{font-family: 'Open Sans';background-image: url(../img/FondoAzul.png); font-size:20px;
 text-align: center;
}
table{width:100%;border:1px solid;border-radius:5px; background-color:#9ACCFC}
th{background-color:#cdd8f6;border:2px}
td,tr,th{border:2px solid;padding:2px;vertical-align:top}
span{color:green;padding-left:5px}
#x{color:red}
h2{text-align:center;}
#titol{ box-shadow:  7px 7px 7px;
  background-color: #9ACCFC;
  margin-left: 30%;
  margin-right: 25%;
  text-align: center;
  width: 40%;
  border-style: solid;
  border-radius: 5px;
  margin-bottom:20px;}
</style>
</head>
<body>
   <div id="titol"><h2>Corrección</h2></div>
  
  <table>
    <tr>
      <th>Pregunta</th>
      <th>Opción</th>
      <th>Respuesta</th>
    </tr>
    <xsl:for-each select="questions/question">      
    <tr>
      <td><xsl:value-of select="title"/></td>
      <td>
       <xsl:for-each select="answer">
        <xsl:choose>
         <xsl:when test="../type = 'text'">
          <span><xsl:value-of select="text()"/></span>
         </xsl:when>
        </xsl:choose>         
       </xsl:for-each>
       <xsl:for-each select="option">
         <xsl:variable name="optposition" select="position()-1"/>
        O<xsl:value-of select="$optposition+1"/>: <xsl:value-of select="text()"/>
         <xsl:for-each select="../answer">
          <xsl:variable name="correctanswer" select="text()"/>
          <xsl:if test="$optposition=$correctanswer">
            <span>&#x2713;</span>
          </xsl:if>
         </xsl:for-each><br/><br/>
       </xsl:for-each>
      </td>
      <td>
       <xsl:for-each select="useranswer">
        <xsl:variable name="useranswer" select="text()"/>
        <xsl:value-of select="text()"/>
        <xsl:for-each select="../answer">
          <xsl:choose>
           <xsl:when test="../type = 'text'">
            <xsl:variable name="correctanswertext" select="text()"/>
            <xsl:if test="$useranswer=$correctanswertext">
              <span>&#x2713;</span>
            </xsl:if>
           </xsl:when>
           <xsl:otherwise>
            <xsl:variable name="correctanswer" select="text()+1"/>
           <xsl:if test="$useranswer=$correctanswer">
              <span>&#x2713;</span>
            </xsl:if>
           </xsl:otherwise>
          </xsl:choose>
         </xsl:for-each>
         <!--<xsl:if test="$count=1">
           <span id='x'>&#x2715;</span>
         </xsl:if> -->
         <br/><br/>
       </xsl:for-each>       
     </td>
    </tr>
    </xsl:for-each>
  </table>
 </body>
 </html>
</xsl:template>

</xsl:stylesheet>
