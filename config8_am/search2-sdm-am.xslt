<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="html" indent="yes" />


<xsl:param name="strFind"/>

<xsl:variable name="lang">
	<xsl:value-of select="translate(//manual/@lang, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')"/>
</xsl:variable>

<xsl:variable name="newline">
<xsl:text>&#13;</xsl:text>
</xsl:variable>

<xsl:include href="ui.xslt"/>


<xsl:template match="/">
	<xsl:for-each select="//sct">
		<xsl:variable name="tablecontents">
			<xsl:for-each select="table/tgroup/tbody/row/entry//*">
				<xsl:value-of select="text()"/>
			</xsl:for-each>
		</xsl:variable>
		<xsl:if test="contains(translate($tablecontents, 'ABCDEFGHIJKLMNOPQRSTUVWXYZÀÁÂÄÇÈËÉÌÎÏÍÑÒÓÔÖŒŠÝÙÚÜÛŽ', 'abcdefghijklmnopqrstuvwxyzàáâäçèëéìîïíñòóôöœšýùúüûž'),$strFind)">
		<xsl:element name="a">
			<xsl:attribute name="href">javascript: loadSdmList('<xsl:value-of select="@id"/>')</xsl:attribute>
			<xsl:attribute name="title"><xsl:value-of select="@title"/></xsl:attribute>
			<xsl:element name="div">
				<xsl:attribute name="class">sie</xsl:attribute>
				<xsl:attribute name="onmouseover">overDiv(this)</xsl:attribute>
				<xsl:attribute name="onmouseout">outDiv(this)</xsl:attribute>
				<xsl:element name="img">
					<xsl:attribute name="class">mark</xsl:attribute>
					<xsl:attribute name="id">mk<xsl:value-of select="@id"/></xsl:attribute>
					<xsl:attribute name="src">../icon/doc.gif</xsl:attribute>
					<xsl:attribute name="width">11px</xsl:attribute>
					<xsl:attribute name="border">0</xsl:attribute>
					<xsl:attribute name="alt">icon</xsl:attribute>
				</xsl:element>
				<xsl:value-of select="@id"/>
				<xsl:text> &#8211; </xsl:text>
				<xsl:value-of select="@title"/>
			</xsl:element>
		</xsl:element>
		</xsl:if>
	</xsl:for-each>
</xsl:template>



</xsl:stylesheet>




