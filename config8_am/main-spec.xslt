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
<title><xsl:value-of select="//servinfo/@servinfosgmlid"/></title>
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

<!-- section -->

<xsl:template match="section">
<xsl:variable name="sct">
	<xsl:call-template name="getSctNum">
		<xsl:with-param name="id" select="@id"/>
	</xsl:call-template>
</xsl:variable>

<xsl:variable name="prevsct">
	<xsl:call-template name="getSctNum">
		<xsl:with-param name="id" select="preceding-sibling::section[1]/@id"/>
	</xsl:call-template>
</xsl:variable>

<xsl:variable name="tgtSct">
	<xsl:call-template name="getSctNum">
		<xsl:with-param name="id" select="$targetID"/>
	</xsl:call-template>
</xsl:variable>

<xsl:variable name="showThis">
	<xsl:text>0</xsl:text>
	<xsl:if test="substring($targetID, 1, 1)=substring(@file,9,1) and $sct!='z'">
		<xsl:text>1</xsl:text>
	</xsl:if>
	<xsl:if test="$sct=$tgtSct">
		<xsl:text>1</xsl:text>
	</xsl:if>
</xsl:variable>
	<xsl:value-of select="$newline"/>
<xsl:if test="$sct!=$prevsct and $showThis!='0'">
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="class">section</xsl:attribute>
			<xsl:value-of select="$newline"/>
			<xsl:element name="div">
				<xsl:attribute name="class">title</xsl:attribute>
				<xsl:call-template name="getUI_strSectionTerm">
					<xsl:with-param name="lang" select="$UI_lang"/>
				</xsl:call-template>
					<xsl:choose>
						<xsl:when test="string-length(@id)=1">
							<xsl:value-of select="@id"/>
						</xsl:when>
						<xsl:otherwise>
							<xsl:value-of select="substring(@id, 1, string-length(@id)-1)"/>
						</xsl:otherwise>
					</xsl:choose>
				<xsl:text> - </xsl:text>
				<xsl:value-of select="@title"/>
			</xsl:element>
		<xsl:apply-templates />
		<xsl:for-each select="following-sibling::section">
			<xsl:variable name="nextsct">
				<xsl:call-template name="getSctNum">
					<xsl:with-param name="id" select="@id"/>
				</xsl:call-template>
			</xsl:variable>
			<xsl:if test="$nextsct=$sct">
				<xsl:apply-templates />
			</xsl:if>
		</xsl:for-each>
	</xsl:element>
</xsl:if>
</xsl:template>

<!-- servcat -->

<xsl:template match="servcat">
<xsl:variable name="sct">
	<xsl:call-template name="getSctNum">
		<xsl:with-param name="id" select="../@id"/>
	</xsl:call-template>
</xsl:variable>
<xsl:if test="$targetID=$sct or $targetID=../@id">
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="class">servcat</xsl:attribute>
		<xsl:value-of select="$newline"/>
		<xsl:element name="div">
			<xsl:attribute name="class">title</xsl:attribute>
			<xsl:call-template name="getUI_strSectionTerm">
				<xsl:with-param name="lang" select="$UI_lang"/>
			</xsl:call-template>
			<xsl:value-of select="../@id"/>
			<xsl:text> - </xsl:text>
			<xsl:value-of select="@title"/>
		</xsl:element>
			<xsl:apply-templates />
	</xsl:element>
</xsl:if>
</xsl:template>

<!-- configtype -->

<xsl:template match="configtype">
	<xsl:value-of select="$newline"/>
<xsl:element name="div">
	<xsl:attribute name="class">configtype</xsl:attribute>
	<xsl:if test="@id!='0'">
		<xsl:value-of select="$newline"/>
		<xsl:element name="div">
			<xsl:attribute name="class">title</xsl:attribute>
			<xsl:value-of select="@title"/>
		</xsl:element>
	</xsl:if>
		<xsl:apply-templates />
</xsl:element>
</xsl:template>

<xsl:template name="getSctNum">
	<xsl:param name="id" />
	<xsl:choose>
		<xsl:when test="$id='00'">z</xsl:when>
		<xsl:when test="$id='a'">az</xsl:when>
		<xsl:when test="string-length($id)=1">
			<xsl:value-of select="$id"/>
		</xsl:when>
		<xsl:when test="string-length($id)=2">
			<xsl:value-of select="substring($id,1,1)"/>
		</xsl:when>
		<xsl:when test="string-length($id)=3">
			<xsl:if test="substring($id,1,2)='10'">A</xsl:if>
			<xsl:if test="substring($id,1,2)='11'">B</xsl:if>
		</xsl:when>
		<xsl:otherwise>--</xsl:otherwise>
	</xsl:choose>
</xsl:template>


</xsl:stylesheet>




