<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="html" encoding="utf-8" indent="yes" doctype-public="-//W3C//DTD HTML 4.0//EN" doctype-system="http://www.w3.org/TR/REC-html40/strict.dtd"/>

<xsl:param name="targetID"/>
<xsl:param name="type"/>

<xsl:variable name="local_UI_lang">
	<xsl:value-of select="translate(//manual/@lang, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')"/>
</xsl:variable>


<xsl:include href="suzuki_all.xsl"/>

<xsl:template match="/">
<html>
	<xsl:value-of select="$newline"/>
<head>
<title>TTM List</title>
	<xsl:value-of select="$newline"/>
	<xsl:choose>
		<xsl:when test="$local_UI_lang = 'jp'">
			<link rel="stylesheet" href="../css/speclists_j" type="text/css"  charset="utf-8"/>
		</xsl:when>
		<xsl:otherwise>
			<link rel="stylesheet" href="../css/speclists_e.css" type="text/css"  charset="utf-8"/>
		</xsl:otherwise>
	</xsl:choose>
	<xsl:value-of select="$newline"/>
<script type="text/javascript">
<xsl:text>
var strLang = "</xsl:text>
<xsl:value-of select="$local_UI_lang"/>
<xsl:text>";</xsl:text>
<xsl:text>
var UI_lang = "</xsl:text>
<xsl:value-of select="$local_UI_lang"/>
<xsl:text>";</xsl:text>
</script>
	<xsl:value-of select="$newline"/>
<script type="text/javascript" src="../scripts/stdio.js" defer="defer"></script>
<script type="text/javascript" src="../scripts/ui.js" defer="defer" charset="utf-8"></script>
	<xsl:value-of select="$newline"/>
</head>
<body onload="fixImgWidth();">
	<xsl:value-of select="$newline"/>
	<xsl:apply-templates select="//section"/>
</body>
</html>
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
		<xsl:with-param name="id">
			<xsl:choose>
				<xsl:when test="$targetID='all'">
					<xsl:value-of select="@id"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="substring($targetID,1,1)"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:with-param>
	</xsl:call-template>
</xsl:variable>

<xsl:variable name="sname">
	<xsl:call-template name="getSnameOnly">
		<xsl:with-param name="sct" select="$sct"/>
		<xsl:with-param name="lang" select="$local_UI_lang"/>
	</xsl:call-template>
</xsl:variable>


<xsl:if test="$sct!=$prevsct and $sct!='az'">
<xsl:if test="$sct=$tgtSct or $targetID='all'">
	<xsl:value-of select="$newline"/>
		<xsl:element name="div">
			<xsl:attribute name="class">section</xsl:attribute>
				<xsl:value-of select="$newline"/>
				<xsl:element name="div">
					<xsl:attribute name="class">title</xsl:attribute>
					<xsl:call-template name="getUI_strSectionTerm">
						<xsl:with-param name="lang" select="$local_UI_lang"/>
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
					<xsl:value-of select="$sname"/>
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
</xsl:if>
</xsl:template>

<!-- servcat -->

<xsl:template match="servcat">
	<xsl:value-of select="$newline"/>
<xsl:variable name="scid">
	<xsl:value-of select="substring(../@file,9,2)"/>
</xsl:variable>
<xsl:if test="string-length($targetID)=1 or substring($targetID, 1, 2)=$scid or $targetID='all'">
	<xsl:element name="div">
		<xsl:attribute name="class">servcat</xsl:attribute>
		<xsl:value-of select="$newline"/>
		<xsl:element name="div">
			<xsl:attribute name="class">title</xsl:attribute>
			<xsl:call-template name="getUI_strSectionTerm">
				<xsl:with-param name="lang" select="$local_UI_lang"/>
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
<xsl:variable name="configid">
	<xsl:value-of select="substring(descendant::servinfo[1]/@id,9,2)"/><xsl:value-of select="@id"/>
</xsl:variable>
<xsl:choose>
	<xsl:when test="@id!='0'">
		<xsl:if test="string-length($targetID)=1 or substring($targetID, 1, 3)=$configid or $targetID='all' or substring($targetID, 3, 2)=@id">
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
		</xsl:if>
	</xsl:when>
	<xsl:otherwise>
		<xsl:apply-templates />
	</xsl:otherwise>
</xsl:choose>
</xsl:template>

<!-- servinfotype -->

<xsl:template match="servinfotype">
	<xsl:for-each select="servinfo">
		<xsl:apply-templates select="."/>
	</xsl:for-each>
</xsl:template>

<!-- servinfo -->

<xsl:template match="servinfo">
	<xsl:apply-templates select="servinfosub|scantool|s1|paragroup|ptxt|list1|table|diag|figure|deflist|torque|spec|spec-sdm|materials|servicetool|attention1|attention2|attention3|attention4"/>
</xsl:template>

<!-- attention1 -->

<xsl:template match="attention1">
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="class">warning</xsl:attribute>
		<img class="attenmark" src="../icon/attenmark.gif" width="16px" border="0"/>
		<xsl:call-template name="getUI_strWarning">
			<xsl:with-param name="lang" select="$local_UI_lang"/>
		</xsl:call-template>
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="style">margin-left:16px;</xsl:attribute>
			<xsl:apply-templates />
	</xsl:element>
	</xsl:element>
</xsl:template>

<!-- attention2 -->

<xsl:template match="attention2">
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="class">caution</xsl:attribute>
		<img class="attenmark" src="../icon/attenmark.gif" width="16px" border="0"/>
		<xsl:call-template name="getUI_strCaution">
			<xsl:with-param name="lang" select="$local_UI_lang"/>
		</xsl:call-template>
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="style">margin-left:16px;</xsl:attribute>
			<xsl:apply-templates />
	</xsl:element>
	</xsl:element>
</xsl:template>

<!-- attention3 -->

<xsl:template match="attention3">
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="class">note</xsl:attribute>
		<xsl:call-template name="getUI_strNote">
			<xsl:with-param name="lang" select="$local_UI_lang"/>
		</xsl:call-template>
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="style">margin-left:16px;</xsl:attribute>
			<xsl:apply-templates />
	</xsl:element>
	</xsl:element>
</xsl:template>

<!-- attention4 -->

<xsl:template match="attention4">
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="class">notice</xsl:attribute>
		<xsl:element name="div">
			<xsl:attribute name="style">font-style:italic;</xsl:attribute>
			<xsl:call-template name="getUI_strNotice">
				<xsl:with-param name="lang" select="$local_UI_lang"/>
			</xsl:call-template>
		</xsl:element>
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="style">margin-left:16px;</xsl:attribute>
			<xsl:apply-templates />
	</xsl:element>
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




