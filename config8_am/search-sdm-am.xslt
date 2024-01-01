<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="html" indent="yes" doctype-public="-//W3C//DTD HTML 4.0//EN" doctype-system="http://www.w3.org/TR/REC-html40/strict.dtd"/>


<xsl:variable name="lang">
	<xsl:value-of select="translate(//manual/@lang, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')"/>
</xsl:variable>

<xsl:variable name="newline">
<xsl:text>&#13;</xsl:text>
</xsl:variable>

<xsl:include href="ui.xslt"/>


<xsl:template match="/">

<html>
<title>Service Data Search</title>
	<xsl:value-of select="$newline"/>
<head>
	<xsl:value-of select="$newline"/>
<link rel="stylesheet" href="../scripts/search.css" type="text/css"  charset="utf-8"/>
	<xsl:value-of select="$newline"/>
<script type="text/javascript" src="../scripts/stdio.js" defer="defer"></script>
	<xsl:value-of select="$newline"/>
<script type="text/javascript" src="../scripts/search.js" defer="defer"></script>
	<xsl:value-of select="$newline"/>
<script type="text/javascript" src="../scripts/ui.js" defer="defer" charset="utf-8"></script>
	<xsl:value-of select="$newline"/>
</head>
	<xsl:value-of select="$newline"/>
<body onload="initSearchSdm()">
	<xsl:value-of select="$newline"/>
<table border="0" width="100%" cellpadding="0" cellspacing="0">
	<tr>
		<td align="center"><div class="listhead">
		<xsl:call-template name="getSdmSearchTitle">
			<xsl:with-param name="lang" select="$lang"/>
		</xsl:call-template>
		<xsl:text>&#160;</xsl:text>
		<img class="title_icon" onclick="setMode('navi_service');" src="../icon/bookmark.gif" border="0"/>
		</div></td>
	</tr>
</table>

<table cellpadding="0" cellspacing="0" border="0" width="300px">
<tr>
<td align="left">
	<form class="searchconsole" name="searchsdm" onSubmit="runSearch_Sdm(); return false;">
	<table border="0" cellpadding="2" cellspacing="0">
	<tr valign="middle"><td align="left" colspan="2" style="padding-left:10px;">
		<xsl:call-template name="getUI_strSearchSdm">
			<xsl:with-param name="lang" select="$lang"/>
		</xsl:call-template>
	</td></tr>
	<tr valign="middle"><td align="left">&#160;
	<input type="text" name="main" length="48"/>&#160;</td>
	<td align="center">
<xsl:variable name="btnUI_Search">
	<xsl:call-template name="getUI_btnSearch">
		<xsl:with-param name="lang" select="$lang"/>
	</xsl:call-template>
</xsl:variable>
	<input type="button" name="search" value=" {$btnUI_Search} " onClick="runSearch_Sdm(this.Form);"/>
	</td></tr>
	</table>
	</form>
	</td>
</tr>
</table>

<div id="tgtResults" class="results"></div>
<div class="last"> </div>
</body>
</html>

</xsl:template>



</xsl:stylesheet>




