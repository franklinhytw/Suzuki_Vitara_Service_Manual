<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="html" encoding="utf-8" indent="yes" doctype-public="-//W3C//DTD HTML 4.0//EN" doctype-system="http://www.w3.org/TR/REC-html40/strict.dtd"/>

<xsl:param name="UI_lang"/>
<xsl:param name="targetID"/>

<xsl:variable name="newline">
<xsl:text>&#13;</xsl:text>
</xsl:variable>

<xsl:include href="ui.xslt"/>
<xsl:include href="main-common.xslt"/>

<xsl:template match="/">
<html>
	<xsl:value-of select="$newline"/>
<head>
<title>Service Data Main</title>
	<xsl:value-of select="$newline"/>
	<xsl:choose>
		<xsl:when test="$UI_lang = 'jp'">
			<link rel="stylesheet" href="../css/speclists_j.css" type="text/css"  charset="utf-8"/>
		</xsl:when>
		<xsl:otherwise>
			<link rel="stylesheet" href="../css/speclists_e.css" type="text/css"  charset="utf-8"/>
		</xsl:otherwise>
	</xsl:choose>
	<xsl:value-of select="$newline"/>
<script type="text/javascript">
var UI_lang = "<xsl:value-of select="$UI_lang"/>";
</script>
<script type="text/javascript" src="../scripts/stdio.js" defer="defer"></script>
	<xsl:value-of select="$newline"/>
</head>
<body>
	<xsl:apply-templates select="//suzuki"/>
</body>
</html>
</xsl:template>

<!-- suzuki -->

<xsl:template match="suzuki">
	<xsl:apply-templates />
</xsl:template>

<!-- sct -->

<xsl:template match="sct">
<xsl:if test="$targetID=@id">
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="class">sct</xsl:attribute>
		<xsl:value-of select="$newline"/>
		<xsl:element name="div">
			<xsl:attribute name="class">title</xsl:attribute>
			<xsl:call-template name="getUI_strSectionTerm">
				<xsl:with-param name="lang" select="$UI_lang"/>
			</xsl:call-template>
			<xsl:value-of select="@id"/>
			<xsl:text> - </xsl:text>
			<xsl:value-of select="@title"/>
		</xsl:element>
		<xsl:apply-templates />
	</xsl:element>
</xsl:if>
</xsl:template>



</xsl:stylesheet>




