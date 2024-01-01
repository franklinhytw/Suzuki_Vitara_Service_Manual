<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="html" encoding="utf-8" indent="yes" doctype-public="-//W3C//DTD HTML 4.0//EN" doctype-system="http://www.w3.org/TR/REC-html40/strict.dtd"/>

<xsl:variable name="lang">
	<xsl:value-of select="translate(//manual/@lang, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')"/>
</xsl:variable>

<xsl:variable name="newline">
<xsl:text>
</xsl:text>
</xsl:variable>

<xsl:include href="ui.xslt"/>


<xsl:template match="/">
<html>
<title>DTC Index</title>
	<xsl:value-of select="$newline"/>
<head>
	<xsl:value-of select="$newline"/>
<link rel="stylesheet" href="../css/navi.css" type="text/css"  charset="utf-8"/>
	<xsl:value-of select="$newline"/>
<script type="text/javascript" src="../scripts/stdio.js" defer="defer"></script>
	<xsl:value-of select="$newline"/>
</head>
<body onload="initNavi();">
<table border="0" width="100%" cellpadding="0" cellspacing="0">
	<tr>
		<td align="center"><div class="listhead">
		<xsl:call-template name="getScanIndexTitle">
			<xsl:with-param name="lang" select="$lang"/>
		</xsl:call-template>
		<xsl:text> </xsl:text>
		<xsl:element name="span">
			<xsl:attribute name="class">all_icon</xsl:attribute>
			<xsl:attribute name="onclick">loadScanList('all');markAll(this);</xsl:attribute>
			<xsl:call-template name="getUI_iconAll">
				<xsl:with-param name="lang" select="$lang"/>
			</xsl:call-template>
		</xsl:element>
		</div></td>
	</tr>
</table>
	<xsl:apply-templates select="//section"/>
	<div class="last">&#160;</div>
</body>
</html>
</xsl:template>

<!-- section -->

<xsl:template match="section">
	<xsl:value-of select="$newline"/>
<xsl:variable name="sct">
	<xsl:choose>
		<xsl:when test="substring(@file,9,2)='00'">z</xsl:when>
		<xsl:when test="substring(@file,9,2)='99' and @id!='9I'">y</xsl:when>
		<xsl:when test="@id='a'">az</xsl:when>
		<xsl:otherwise>
			<xsl:value-of select="substring(@file,9,1)"/>
		</xsl:otherwise>
	</xsl:choose>
</xsl:variable>
<xsl:variable name="prevsct">
	<xsl:choose>
		<xsl:when test="substring(preceding-sibling::section[1]/@file,9,2)='00'">00</xsl:when>
		<xsl:otherwise>
			<xsl:value-of select="substring(preceding-sibling::section[1]/@file,9,1)"/>
		</xsl:otherwise>
	</xsl:choose>
</xsl:variable>

<xsl:variable name="sname">
	<xsl:call-template name="getSname">
		<xsl:with-param name="sct" select="$sct"/>
		<xsl:with-param name="lang" select="$lang"/>
	</xsl:call-template>
</xsl:variable>

<xsl:variable name="snametooltip">
	<xsl:call-template name="getSnameTooltip">
		<xsl:with-param name="sct" select="$sct"/>
		<xsl:with-param name="lang" select="$lang"/>
	</xsl:call-template>
</xsl:variable>


<xsl:choose>
	<xsl:when test="$sct!=$prevsct and $sct!='az'">
		<xsl:element name="a">
			<xsl:attribute name="href">javascript: loadScanList('<xsl:value-of select="$sct"/>');markAll(this)</xsl:attribute>
			<xsl:attribute name="title"><xsl:value-of select="$snametooltip"/></xsl:attribute>
			<xsl:element name="div">
				<xsl:attribute name="class">sct</xsl:attribute>
				<xsl:attribute name="onmouseover">overDiv(this)</xsl:attribute>
				<xsl:attribute name="onmouseout">outDiv(this)</xsl:attribute>
				<xsl:element name="img">
					<xsl:attribute name="class">mark</xsl:attribute>
					<xsl:attribute name="id">mk<xsl:value-of select="$sct"/></xsl:attribute>
					<xsl:attribute name="src">../icon/doc.gif</xsl:attribute>
					<xsl:attribute name="width">11px</xsl:attribute>
					<xsl:attribute name="border">0</xsl:attribute>
					<xsl:attribute name="alt">icon</xsl:attribute>
				</xsl:element>
				<xsl:value-of select="$sname"/>
			</xsl:element>
		</xsl:element>
	</xsl:when>
	<xsl:otherwise>
	</xsl:otherwise>
</xsl:choose>
</xsl:template>



<xsl:template match="text()">
<!-- the method used here is to remove the return characters in the text nodes of the instance data, which are treated as whitespace in the transformation and subsequently displayed as a single space in the browser. -->
	<xsl:variable name="txtstring">
		<xsl:value-of select="."/>
	</xsl:variable>
	<xsl:variable name="CR">&#13;</xsl:variable>

	<xsl:value-of select="translate($txtstring, $CR, '')"/>
</xsl:template>


</xsl:stylesheet>




